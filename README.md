# To-Do List Application

A modern, responsive web application for managing your daily tasks with a beautiful UI and smooth animations.

## Features

- ✅ **Add Tasks**: Create new tasks with a clean input interface
- ✅ **Mark as Complete**: Click the circular checkbox to toggle task completion
- ✅ **Delete Tasks**: Remove individual tasks with a delete button
- ✅ **Filter Tasks**: View All, Active, or Completed tasks
- ✅ **Clear Completed**: Bulk remove all completed tasks
- ✅ **Task Counter**: See how many tasks remain
- ✅ **Local Storage**: Tasks persist between browser sessions
- ✅ **Responsive Design**: Works perfectly on desktop and mobile
- ✅ **Smooth Animations**: Beautiful transitions and hover effects
- ✅ **Notifications**: User-friendly feedback for actions
- ✅ **Modern UI**: Clean, gradient-based design with Inter font

## How to Use

1. **Open the Application**: Simply open `index.html` in any modern web browser
2. **Add a Task**: Type your task in the input field and press Enter or click the + button
3. **Complete a Task**: Click the circular checkbox next to any task
4. **Delete a Task**: Hover over a task and click the "Delete" button that appears
5. **Filter Tasks**: Use the filter buttons (All, Active, Completed) to view different task states
6. **Clear Completed**: Click "Clear Completed" to remove all finished tasks

## File Structure

```
todo-list/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: ES6+ features with classes and modules
- **Local Storage**: Browser-based data persistence

### Key Features Implementation

#### Task Management
- Tasks are stored as objects with unique IDs, text, completion status, and timestamps
- All operations (add, toggle, delete) update both the UI and local storage
- Smooth animations for adding and removing tasks

#### Filtering System
- Three filter states: All, Active, Completed
- Dynamic task counting and display
- Empty state messages for each filter

#### User Experience
- Keyboard support (Enter to add tasks)
- Toast notifications for user feedback
- Responsive design for all screen sizes
- Hover effects and smooth transitions

#### Data Persistence
- Uses browser's localStorage API
- Automatic saving on every task modification
- Sample tasks provided on first visit

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Getting Started

1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start adding your tasks!

No server setup or installation required - it's a pure client-side application.

## Customization

The application is easily customizable:

- **Colors**: Modify the CSS variables in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Animations**: Adjust timing and effects in the CSS animations
- **Features**: Extend the JavaScript class to add new functionality

## License

This project is open source and available under the MIT License. 