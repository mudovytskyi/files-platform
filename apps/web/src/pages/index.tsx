import { FileList } from '@components/FileList';
import { UploadButton } from '@components/UploadButton';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Файловий менеджер</h1>
      <div className="mb-8">
        <UploadButton />
      </div>
      <FileList />
    </main>
  );
}
