# Lilypad Module Builder

A modern, user-friendly web application for creating and configuring Lilypad modules using a visual form interface. Built with React, Material-UI, and JSON Forms.

![Module Builder Screenshot](https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1200&h=600)

## Features

- 🎨 **Intuitive Visual Interface**: Configure your Lilypad modules through a clean, organized form layout
- 🔄 **Real-time JSON Preview**: See your configuration updates instantly in the JSON preview pane
- 📱 **Responsive Design**: Works seamlessly on both desktop and mobile devices
- 🎯 **Smart Validation**: Built-in validation ensures your configuration is always valid
- 💾 **Export Configuration**: Download your module configuration as a JSON file
- 📋 **Copy to Clipboard**: Easily copy the JSON configuration with one click

## Key Components

- **Machine Requirements**: Configure CPU, RAM, and GPU requirements
- **Job Settings**: Set API version, engine type, and other core parameters
- **Docker Configuration**: Specify Docker image, entrypoint commands, and environment variables
- **Network & Publishing**: Configure network type and publishing settings
- **Resource Allocation**: Fine-tune resource allocation for your module

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development server URL

## Usage

1. **Configure Machine Requirements**:
   - Set CPU requirements in millicores (1000m = 1 core)
   - Specify RAM requirements in megabytes
   - Configure GPU requirements (0-8 GPUs)

2. **Set Job Configuration**:
   - Choose API version
   - Configure Docker settings
   - Set network and publishing options
   - Specify resource allocations

3. **Export Configuration**:
   - Click the "Export Configuration" button to download as JSON
   - Or use the copy button to copy the JSON to your clipboard

## Technology Stack

- **React**: Frontend framework
- **TypeScript**: Type-safe development
- **Material-UI**: UI components and theming
- **JSON Forms**: Dynamic form generation from JSON Schema
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and development server

## Development

- **Start Development Server**:
  ```bash
  npm run dev
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Project Structure

```
src/
├── schemas/           # JSON Schema and UI Schema definitions
│   ├── module.schema.json
│   └── module.uischema.json
├── App.tsx           # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles and Material-UI overrides
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.