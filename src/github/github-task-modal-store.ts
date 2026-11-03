import { reactive } from "vue";
import type { RepositoryLink } from "../todoist/repository-links";

interface GitHubTaskModalState {
  isOpen: boolean;
  repository: RepositoryLink | null;
}

export const githubTaskModalState = reactive<GitHubTaskModalState>({
  isOpen: false,
  repository: null
});

export const githubTaskModalController = {
  open(repo: RepositoryLink) {
    githubTaskModalState.repository = repo;
    githubTaskModalState.isOpen = true;
  },
  close() {
    githubTaskModalState.isOpen = false;
  }
};
