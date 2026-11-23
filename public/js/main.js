(function initFileManager() {
    const root = document.querySelector('[data-file-manager]');
    if (!root) return;

    const fileInput = root.querySelector('[data-file-input]');
    const browser = root.querySelector('[data-browser]');
    const items = root.querySelector('[data-browser-items]');
    const emptyState = root.querySelector('[data-browser-empty]');
    const locationLabel = root.querySelector('[data-location]');
    const uploadStatus = root.querySelector('[data-upload-status]');
    const loadError = root.querySelector('[data-load-error]');
    const currentFolderId = new URLSearchParams(window.location.search).get('id');
    let selectedFileId = null;

    function fileLabel(file) {
        return file.extension ? `${file.name}.${file.extension}` : file.name;
    }

    function createFileItem(file) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.fileId = file.id;
        button.setAttribute('aria-pressed', 'false');
        button.className = 'min-h-24 rounded border border-slate-200 bg-white p-3 text-left hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-700 aria-pressed:border-emerald-700 aria-pressed:bg-emerald-50';

        const icon = document.createElement('span');
        icon.className = 'mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500';
        icon.textContent = file.extension || 'File';

        const name = document.createElement('span');
        name.className = 'block break-all text-sm font-medium';
        name.textContent = fileLabel(file);
        button.append(icon, name);
        return button;
    }

    function createDirectoryItem(directory) {
        const link = document.createElement('a');
        link.href = `/folder/?id=${encodeURIComponent(directory.id)}`;
        link.dataset.dropFolderId = directory.id;
        link.dataset.dragging = 'false';
        link.className = 'min-h-24 rounded border border-emerald-200 bg-emerald-50 p-3 text-left hover:border-emerald-600 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-700 data-[dragging=true]:border-emerald-700 data-[dragging=true]:bg-emerald-200';

        const type = document.createElement('span');
        type.className = 'mb-2 block text-xs font-semibold uppercase tracking-wide text-emerald-800';
        type.textContent = 'Folder';

        const name = document.createElement('span');
        name.className = 'block break-all text-sm font-medium text-slate-900';
        name.textContent = directory.name;
        link.append(type, name);
        return link;
    }

    async function loadFiles() {
        items.replaceChildren();
        loadError.classList.add('hidden');
        locationLabel.textContent = currentFolderId ? `Folder ${currentFolderId}` : 'Root';

        try {
            const fetchUrl = new URL('/storage/fetch', window.location.origin);
            if (currentFolderId) fetchUrl.searchParams.set('id', currentFolderId);
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`Request failed (${response.status})`);

            const { data } = await response.json();
            const directories = data?.directories ?? [];
            const files = data?.files ?? [];
            directories.forEach((directory) => items.append(createDirectoryItem(directory)));
            files.forEach((file) => items.append(createFileItem(file)));
            emptyState.classList.toggle('hidden', directories.length + files.length > 0);
        } catch (error) {
            emptyState.classList.add('hidden');
            loadError.textContent = `Unable to load this folder: ${error.message}`;
            loadError.classList.remove('hidden');
        }
    }

    async function uploadFile(file, directoryId = currentFolderId) {
        const formData = new FormData();
        formData.append('files', file);
        if (directoryId) formData.append('directoryId', directoryId);
        uploadStatus.textContent = `Uploading ${file.name}...`;

        try {
            const response = await fetch('/storage/upload', { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || `Upload failed (${response.status})`);

            uploadStatus.textContent = `${file.name} uploaded successfully.`;
            await loadFiles();
        } catch (error) {
            uploadStatus.textContent = error.message || `Unable to upload ${file.name}.`;
        }
    }

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) uploadFile(fileInput.files[0]);
        fileInput.value = '';
    });

    items.addEventListener('click', (event) => {
        const fileButton = event.target.closest('[data-file-id]');
        if (!fileButton) return;

        selectedFileId = selectedFileId === fileButton.dataset.fileId ? null : fileButton.dataset.fileId;
        items.querySelectorAll('[data-file-id]').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.fileId === selectedFileId));
        });
    });

    browser.addEventListener('dragover', (event) => {
        if (!event.dataTransfer.types.includes('Files')) return;
        event.preventDefault();
        browser.dataset.dragging = 'true';
        const folderDropTarget = event.target.closest('[data-drop-folder-id]');
        if (folderDropTarget) folderDropTarget.dataset.dragging = 'true';
    });

    browser.addEventListener('dragleave', (event) => {
        if (event.relatedTarget && browser.contains(event.relatedTarget)) return;
        browser.dataset.dragging = 'false';
        browser.querySelectorAll('[data-drop-folder-id]').forEach((folder) => {
            folder.dataset.dragging = 'false';
        });
    });

    browser.addEventListener('drop', async (event) => {
        if (!event.dataTransfer.files.length) return;
        event.preventDefault();
        browser.dataset.dragging = 'false';

        const folderDropTarget = event.target.closest('[data-drop-folder-id]');
        const directoryId = folderDropTarget?.dataset.dropFolderId ?? currentFolderId;
        browser.querySelectorAll('[data-drop-folder-id]').forEach((folder) => {
            folder.dataset.dragging = 'false';
        });

        for (const file of event.dataTransfer.files) {
            await uploadFile(file, directoryId);
        }
    });

    loadFiles();
})();