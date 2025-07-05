class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.updateTaskCount();
    }

    bindEvents() {
        // Add task button
        document.getElementById('addTask').addEventListener('click', () => this.addTask());
        
        // Enter key in input field
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed button
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.clearCompleted();
        });
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveToLocalStorage();
        this.renderTasks();
        this.updateTaskCount();
        
        input.value = '';
        this.showNotification('Task added successfully!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
            this.renderTasks();
            this.updateTaskCount();
        }
    }

    deleteTask(id) {
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.saveToLocalStorage();
                this.renderTasks();
                this.updateTaskCount();
                this.showNotification('Task deleted!', 'info');
            }, 300);
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'info');
            return;
        }

        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveToLocalStorage();
        this.renderTasks();
        this.updateTaskCount();
        this.showNotification(`${completedCount} completed task(s) cleared!`, 'success');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <p>${this.getEmptyStateMessage()}</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="todoApp.toggleTask(${task.id})"></div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})">
                    Delete
                </button>
            </li>
        `).join('');
    }

    getEmptyStateMessage() {
        switch (this.currentFilter) {
            case 'active':
                return 'No active tasks. Add some tasks to get started!';
            case 'completed':
                return 'No completed tasks yet.';
            default:
                return 'No tasks yet. Add your first task above!';
        }
    }

    updateTaskCount() {
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        const totalTasks = this.tasks.length;
        
        let countText = '';
        if (totalTasks === 0) {
            countText = 'No tasks';
        } else if (activeTasks === 0) {
            countText = 'All tasks completed!';
        } else if (activeTasks === 1) {
            countText = '1 task remaining';
        } else {
            countText = `${activeTasks} tasks remaining`;
        }
        
        document.getElementById('taskCount').textContent = countText;
    }

    saveToLocalStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            animation: slideInRight 0.3s ease;
        `;

        // Add close button styles
        notification.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationColor(type) {
        switch (type) {
            case 'success':
                return '#28a745';
            case 'error':
                return '#dc3545';
            case 'warning':
                return '#ffc107';
            default:
                return '#17a2b8';
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// Add some sample tasks for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Only add sample tasks if no tasks exist
    if (localStorage.getItem('todoTasks') === null) {
        const sampleTasks = [
            { id: Date.now() - 3000, text: 'Welcome to your To-Do List!', completed: false, createdAt: new Date().toISOString() },
            { id: Date.now() - 2000, text: 'Click the checkbox to mark as complete', completed: true, createdAt: new Date().toISOString() },
            { id: Date.now() - 1000, text: 'Use the filters to view different task states', completed: false, createdAt: new Date().toISOString() }
        ];
        localStorage.setItem('todoTasks', JSON.stringify(sampleTasks));
    }
}); 