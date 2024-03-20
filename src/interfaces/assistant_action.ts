import { Agent } from "../classes";

export interface PropsAssistantAction {
  agentsArray: Agent[];
  agentStatus: boolean[];
  onStandBy: (arg: number) => void;
  onFinish: (arg: number) => void;
  onNext: (arg: number) => void;
  onRepeat: (arg: number) => void;
  onCallStandBy: (arg: number) => void;
}