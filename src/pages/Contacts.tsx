import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Camera" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Фото на паспорт
              </h1>
            </Link>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Icon name="Home" size={18} />
                Главная
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Свяжитесь с нами
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Есть вопросы? Мы всегда готовы помочь!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
            <Card className="p-8 shadow-xl border-2">
              <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Как мы можем помочь?"
                    required
                    className="w-full min-h-32"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  <Icon name="Send" size={18} />
                  Отправить
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-muted-foreground">support@photopassport.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Режим работы</h4>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-muted-foreground">Сб-Вс: выходной</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Мы в социальных сетях</h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full hover:bg-primary/10">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full hover:bg-secondary/10">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full hover:bg-accent/10">
                <Icon name="Facebook" size={20} />
              </Button>
            </div>
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
