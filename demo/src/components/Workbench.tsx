import type { DesignActions, DesignState, GuestEvent } from "../contracts";
import { Header } from "./Header";
import { Canvas } from "./Canvas";
import { Inspector } from "./Inspector";
import type { ActivityService } from "../activity/ActivityService";

export interface WorkbenchProps {
  state: DesignState;
  actions: DesignActions;
  activity: ActivityService;
  onGuest: (file: string, event: GuestEvent) => void;
}

export function Workbench({
  state,
  actions,
  activity,
  onGuest,
}: WorkbenchProps) {
  return (
    <main className="workbench">
      <Header state={state} actions={actions} />
      <div className="workspace">
        <Canvas
          state={state}
          actions={actions}
          activity={activity}
          onGuest={onGuest}
        />
        {state.panelOpen && <Inspector state={state} actions={actions} />}
      </div>
    </main>
  );
}

export default Workbench;
