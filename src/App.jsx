import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject";

function App() {

    const [projectState, setProjectState] = useState({
        selectProjectId: undefined,
        projects: []
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

    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectProjectId
    );
    let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>;
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
