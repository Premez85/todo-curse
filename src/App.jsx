import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject";

function App() {

    const [projectState, setProjectState] = useState({
        selectProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleStartAddProject() {
        setProjectState(prev => {
            return {
                ...prev,
                selectProjectId: null
            }
        })
    }

    function handleSelectProject(id) {
        setProjectState(prev => {
            return {
                ...prev,
                selectProjectId: id
            }
        })
    }


    function handleCancelAdd() {
        setProjectState(prev => {
            return {
                ...prev,
                selectProjectId: undefined
            }
        })
    }

    function handleDeleteProject() {
        setProjectState(prev => {
            return {
                ...prev,
                selectProjectId: undefined,
                projects: prev.projects.filter(project => project.id !== prev.selectProjectId)
            }
        })
    }

    function handleAddProject(project) {
        const projectId = Math.random();
        const newProject = {
            ...project,
            id: projectId
        }
        setProjectState(prev => {
            return {
                ...prev,
                selectProjectId: undefined,
                projects: [...prev.projects, newProject]
            }
        })
    }

    function handleAddTask(taskTitle) {
        setProjectState(prev => {
            const tasktId = Math.random();
            const newTask = {
                text: taskTitle,
                id: tasktId,
                projectId: prev.selectProjectId
            }
            return {
                ...prev,
                tasks: [...prev.tasks, newTask]
            }
        })
    }

    function handleDeleteTask(taskId) {
        setProjectState(prev => {
            const newTasks = prev.tasks.filter(task => task.id !== taskId);
            return{
                ...prev,
                tasks: newTasks
            }
        })
    }

    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectProjectId
    );
    const tasks = projectState.tasks.filter(task => task.projectId === projectState.selectProjectId);
    let content = <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={tasks}
    />;
    if (projectState.selectProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAdd}/>
    } else if (projectState.selectProjectId === undefined) {
        content = <NoProjectSelected onStartNewProject={handleStartAddProject}/>
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSidebar
                onStartNewProject={handleStartAddProject}
                projects={projectState.projects}
                onSelectedProject={handleSelectProject}
            />
            {content}
        </main>
    );
}

export default App;
