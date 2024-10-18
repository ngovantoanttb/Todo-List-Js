import html from "../core.js";
import { connect } from "../store.js"


function Footer({ todos, filter, filters }) {
    const activeCount = todos.filter(filters.active).length;
    const totalCount = todos.length;
    const completedCount = todos.filter(filters.completed).length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return html `
        <footer class="footer">
            <span class="todo-count">
            <strong>${activeCount}</strong> item</span>

            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li>
                        <a class="${filter === type && ' selected'}" href="#"
                            onclick="dispatch('switchFilter', '${type}')">
                            ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            
            ${completedCount > 0 && html`
                <button class="clear-completed" onclick="dispatch('clearCompleted')">Clear completed</button>
            `}
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
                <span class="percentage">Task Completed ${percentage}%</span>
            </div>
        </footer>
    `;
}


export default connect()(Footer);