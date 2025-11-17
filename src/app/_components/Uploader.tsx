'use client';

import { useRef } from 'react';
import { Button } from '@/app/_components/ui/button';

type UploaderProps = {
    files: File[];
    onFilesChange: (files: File[]) => void;
    disabled?: boolean;
};

export const Uploader = ({ files, onFilesChange, disabled }: UploaderProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = Array.from(e.target.files || []);
        if (!selected.length) return;
        onFilesChange(selected);
    }

    function clearFiles() {
        onFilesChange([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Photos</p>
            <p className="text-xs text-muted-foreground">
                Add up to 10 photos of the car. You can crop and reorder later.
            </p>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleSelect}
                disabled={disabled}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />

            {files.length > 0 && (
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        {files.length} file(s) selected(s):
                    </p>
                    <ul className="max-h-24 list-inside list-disc overflow-y-auto text-xs text-muted-foreground">
                        {files.map((f) => (
                            <li key={f.name + f.lastModified}>{f.name}</li>
                        ))}
                    </ul>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearFiles}
                        disabled={disabled}
                    >
                        Clear photos
                    </Button>
                </div>
            )}
        </div>
    );
};
