import { trpc } from '@utils/trpc';
import { FileItem } from './FileItem';
import { FilePlatform } from '@file-platform/shared-lib/src';

export function FileList() {
  const { data: files, isLoading } = trpc.getFiles.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <span className="text-gray-500">Завантаження...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files?.map((file: FilePlatform) => <FileItem key={file.id} file={file} />)}
    </div>
  );
}
