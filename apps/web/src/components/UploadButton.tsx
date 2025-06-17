import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Progress } from '@file-platform/ui';
import { trpc } from '@utils/trpc';

export function UploadButton() {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const utils = trpc.useContext();

  const uploadMutation = trpc.uploadFile.useMutation({
    onSuccess: () => {
      void utils.getFiles.invalidate();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await Promise.all(
        acceptedFiles.map(async (file) => {
          if (file.size > 5 * 1024 * 1024 * 1024) {
            // Обробка помилки
            return;
          }

          try {
            const fileString = Buffer.from(await file.arrayBuffer()).toString('base64');
            return uploadMutation.mutate(
              { file: fileString, name: file.name },
              {
                onSuccess: () => {
                  void utils.getFiles.invalidate();
                },
                // onProgress: (progress: number) => {
                //   setUploadProgress((prev) => ({
                //     ...prev,
                //     [file.name]: progress,
                //   }));
                // },
              }
            );
          } catch (error) {
            console.log(error);
          }
        })
      );
    },
    [uploadMutation, setUploadProgress]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      >
        <input {...getInputProps()} />
        <Button variant="default" className="w-full">
          {isDragActive ? 'Відпустіть файли тут' : 'Завантажити файли'}
        </Button>
      </div>

      {/* Прогрес завантаження */}
      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="mt-4">
          <div className="text-sm text-gray-600">{fileName}</div>
          <Progress value={progress} maxValue={100} />
        </div>
      ))}
    </div>
  );
}
