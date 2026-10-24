export const REPOSITORY_DRAG_TYPE = "application/x-logicweaver-gh-repo";
export function readRepositoryDrag(data: DataTransfer | null): string | undefined {
  if (!data || !Array.from(data.types).includes(REPOSITORY_DRAG_TYPE)) return;
  const name = data.getData(REPOSITORY_DRAG_TYPE);
  if (name.length <= 140 && /^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(name)) return name;
}
