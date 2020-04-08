import files, {
  fileLoading,
  fileReceived,
  fileFailed,
  loadFiles
} from './fileSlice';
import { async } from 'pdfjs-dist/build/pdf.worker';

describe('fileSlice', () => {
  describe('file reducer', () => {
    it('should handle initial state', () => {
      expect(files(undefined, {})).toEqual({ loading: 'idle', files: [] });
    });

    it('should handle "fileLoading"', () => {
      expect(files(undefined, fileLoading())).toEqual({
        loading: 'pending',
        files: []
      });
      expect(files({ loading: 'error', files: [1] }, fileLoading())).toEqual({
        loading: 'pending',
        files: [1]
      });
    });

    it('should handle "fileReceived"', () => {
      const mockFile = { mock: 'file' };
      expect(files(undefined, fileReceived(mockFile))).toEqual({
        loading: 'idle',
        files: [mockFile]
      });
      // works for second file as well
      expect(
        files({ loading: 'pending', files: [mockFile] }, fileReceived(mockFile))
      ).toEqual({
        loading: 'idle',
        files: [mockFile, mockFile]
      });
    });
    it('should handle "fileFailed"', () => {
      expect(files({ loading: 'pending', files: [] }, fileFailed())).toEqual({
        loading: 'error',
        files: []
      });
    });
  });

  // describe('loadFilesThunk', () => {
  //   const mockFiles = [
  //     {
  //       name: 'mock',
  //       type: 'mockType',
  //       arrayBuffer: async () => {
  //         return 'myFakeFileBufferData';
  //       }
  //     }
  //   ];
  //   it('dispatches "fileLoading" action', async () => {
  //     const dispatch = jest.fn();
  //     await loadFiles(mockFiles)(dispatch);

  //     expect(dispatch).toHaveBeenLastCalledWith(fileLoading(mockFiles[0].name));
  //   });
  //   it('gets file Arraybuffer data', test.todo);
  //   describe('when file loads ', () => {
  //     it('dispatches fileReceived', test.todo);
  //   });
  //   describe('when file fails to load', () => {
  //     it('dispatches "fileFailed"', test.todo);
  //   });
  // });
});
