export const createFilesSlice = (set) => ({
  jobFiles: {},

  addFileVersion: (jobId, version) =>
    set((state) => {
      const container = state.jobFiles[jobId] || {
        jobId,
        currentActiveVersionId: version.versionId,
        versions: [],
      };

      return {
        jobFiles: {
          ...state.jobFiles,
          [jobId]: {
            ...container,
            currentActiveVersionId: version.versionId,
            versions: [version, ...container.versions],
          },
        },
      };
    }),
});
