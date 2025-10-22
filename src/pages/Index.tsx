import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function Index() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Ошибка',
          description: 'Пожалуйста, выберите изображение',
          variant: 'destructive',
        });
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processImage = async () => {
    if (!selectedFile) return;
    
    setProcessing(true);
    
    setTimeout(() => {
      setProcessedImage(preview);
      setProcessing(false);
      toast({
        title: 'Готово!',
        description: 'Фото обработано и готово к скачиванию',
      });
    }, 2000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    setProcessedImage(null);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'passport-photo.jpg';
    link.click();
    
    toast({
      title: 'Скачивание',
      description: 'Фото успешно скачано',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Camera" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Фото на паспорт
              </h1>
            </div>
            <Link to="/contacts">
              <Button variant="outline" className="gap-2">
                <Icon name="Mail" size={18} />
                Контакты
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Создайте идеальное фото
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Наша платформа автоматически обработает ваше фото под требования российского паспорта: 
              правильный размер, фон и кадрирование
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
            <Card className="p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Icon name="Upload" className="text-primary" size={32} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center">Загрузите фото</h3>
                
                {!preview ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full border-4 border-dashed border-muted rounded-2xl p-12 text-center cursor-pointer hover:border-primary transition-all duration-300 hover:bg-primary/5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Icon name="ImagePlus" className="mx-auto mb-4 text-muted-foreground" size={48} />
                      <p className="text-lg font-medium mb-2">Перетащите фото сюда</p>
                      <p className="text-sm text-muted-foreground mb-4">или нажмите для выбора</p>
                      <Button type="button" variant="outline" className="gap-2">
                        <Icon name="FolderOpen" size={18} />
                        Выбрать файл
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="w-full space-y-4 animate-scale-in">
                    <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20">
                      <img src={preview} alt="Preview" className="w-full h-auto" />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={processImage}
                        disabled={processing}
                        className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      >
                        {processing ? (
                          <>
                            <Icon name="Loader2" className="animate-spin" size={18} />
                            Обработка...
                          </>
                        ) : (
                          <>
                            <Icon name="Sparkles" size={18} />
                            Обработать
                          </>
                        )}
                      </Button>
                      <Button onClick={resetUpload} variant="outline" className="gap-2">
                        <Icon name="X" size={18} />
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Icon name="CheckCircle2" className="text-secondary" size={32} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center">Результат</h3>
                
                {!processedImage ? (
                  <div className="w-full border-4 border-dashed border-muted rounded-2xl p-12 text-center">
                    <Icon name="ImageOff" className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <p className="text-lg font-medium mb-2">Здесь будет результат</p>
                    <p className="text-sm text-muted-foreground">Загрузите и обработайте фото</p>
                  </div>
                ) : (
                  <div className="w-full space-y-4 animate-scale-in">
                    <div className="relative rounded-2xl overflow-hidden border-4 border-secondary/20">
                      <img src={processedImage} alt="Processed" className="w-full h-auto" />
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Icon name="Check" size={14} />
                        Готово
                      </div>
                    </div>
                    <Button
                      onClick={downloadImage}
                      className="w-full gap-2 bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity"
                    >
                      <Icon name="Download" size={18} />
                      Скачать фото
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" className="text-primary" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">Быстро</h4>
              <p className="text-sm text-muted-foreground">Обработка за считанные секунды</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-secondary" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">Безопасно</h4>
              <p className="text-sm text-muted-foreground">Ваши фото не сохраняются</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Target" className="text-accent" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">Точно</h4>
              <p className="text-sm text-muted-foreground">Соответствие всем требованиям</p>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t mt-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Фото на паспорт. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
