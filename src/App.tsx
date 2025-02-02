import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { createTheme, ThemeProvider } from '@mui/material';
import { Download, Settings, Copy } from 'lucide-react';
import schema from './schemas/module.schema.json';
import uischema from './schemas/module.uischema.json';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        margin: 'dense'
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small'
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        margin: 'dense'
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.8125rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1rem',
          '&:last-child': {
            paddingBottom: '1rem'
          }
        }
      }
    }
  },
  typography: {
    fontSize: 13
  }
});

const initialData = {
  spec: {
    machine: {
      gpu: 1,
      cpu: 1000,
      ram: 1000
    },
    job: {
      APIVersion: 'V1beta1',
      Spec: {
        Deal: {
          Concurrency: 1
        },
        Docker: {
          Entrypoint: [
            '/run_ollama.sh',
            '{{ if .Prompt }} {{ .Prompt }} {{else}} "write a quick sort algorithm" {{ end }}'
          ],
          Image: 'ghcr.io/rhochmayr/ollama-qwen2.5-coder-7b:1.0.0'
        },
        Engine: 'Docker',
        Network: {
          Type: 'None'
        },
        PublisherSpec: {
          Type: 'IPFS'
        },
        Resources: {
          GPU: '1'
        },
        Timeout: 1800,
        Verifier: 'Noop'
      }
    }
  }
};



function App() {
  const [data, setData] = React.useState(initialData);

const stringifyJson = (obj: any): string => {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'string' && value.includes('{{') && value.includes('}}')) {
      // For strings containing template expressions, wrap them in special tokens.
      return `__TEMPLATE_START__${value}__TEMPLATE_END__`;
    }
    return value;
  }, 2)
  // Replace the special tokens with unquoted template expressions,
  // and remove any escaped quotes within them.
  .replace(/"__TEMPLATE_START__(.*?)__TEMPLATE_END__"/g, (_, p1) => p1.replace(/\\"/g, '"'));
};

  // Keep track of the last machine GPU value to detect changes
  const lastMachineGpuRef = React.useRef(initialData.spec.machine.gpu);

  React.useEffect(() => {
    const machineGpu = data?.spec?.machine?.gpu;
    const resourcesGpu = data?.spec?.job?.Spec?.Resources?.GPU;
    
    // Update if machine GPU changed or was removed
    if (machineGpu === undefined || String(machineGpu) !== resourcesGpu) {
      lastMachineGpuRef.current = machineGpu;
      setData(prevData => ({
        ...prevData,
        spec: {
          ...prevData.spec,
          job: {
            ...prevData.spec.job,
            Spec: {
              ...prevData.spec.job.Spec,
              Resources: {
                ...prevData.spec.job.Spec.Resources,
                GPU: machineGpu === undefined ? '' : String(machineGpu)
              }
            }
          }
        }
      }));
    }
  }, [data?.spec?.machine?.gpu]);

  const handleChange = ({ data: newData }) => {
    setData(newData);
  };

  const prettyJson = React.useMemo(() => {
    return stringifyJson(data);
  }, [data]);

  const handleDownload = () => {
    const blob = new Blob([prettyJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lilypad_module.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(prettyJson);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-indigo-600" />
            <h1 className="text-lg font-bold text-gray-900">
              Lilypad Module Builder
            </h1>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Configuration
          </button>
        </div>
      </header>
      <main className="px-4 py-3 flex gap-4">
        <div className="w-1/2 bg-white shadow rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">JSON Preview</h2>
            <button
              onClick={handleCopyJson}
              className="inline-flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </button>
          </div>
          <pre className="bg-gray-50 p-3 rounded-md overflow-auto text-xs font-mono h-[calc(100vh-10rem)]">
            {prettyJson}
          </pre>
        </div>
        <div className="w-1/2 bg-white shadow rounded-lg p-3">
          <div className="overflow-auto h-[calc(100vh-10rem)]">
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={handleChange}
            />
          </div>
        </div>
      </main>
    </div>
    </ThemeProvider>
  );
}

export default App;
