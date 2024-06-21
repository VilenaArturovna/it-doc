class FileService {
  download(url: string) {
    window.open(url, '_blank');
  }

  downloadBlob(blob: Blob) {
    this.download(URL.createObjectURL(blob));
  }

  downloadBlobForXlsx(blob: Blob, name: string) {
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.href = url;
    a.download = `${name}.xlsx`;
    a.click();
    a.remove();
  }
}

export default new FileService();
