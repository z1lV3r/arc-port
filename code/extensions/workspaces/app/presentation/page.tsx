import { useEffect, useState } from "react";
import { DependencyProvider } from "../dependency-provider";

function Page() {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const workspaceUseCases = DependencyProvider.getCreateWorkspaceUseCases();
  
  const workspaceId = new URLSearchParams(window.location.search).get("workspaceId");
  if (!workspaceId) {
    throw new Error("Workspace ID not found");
  }

  useEffect(() => {
    const loadWorkspace = async () => {
      const workspace = await workspaceUseCases.getWorkspace(workspaceId);
      setWorkspaceName(workspace.name);
      setIcon(workspace.iconUrl);
      setTitle(workspace.name);
    };

    loadWorkspace();
  }, []);

  return (
    <div>
      <h1>{workspaceName || "Workspace"}</h1>
    </div>
  );
}

export { Page };

function setIcon(iconUrl: string) {
  if (!iconUrl) {
    return;
  }
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = iconUrl;
}

function setTitle(title: string) {
  if (!title) {
    return;
  }
  document.title = title;
}