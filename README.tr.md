# 🦭 Walrus Blob Explorer

[Walrus](https://walrus.xyz) merkeziyetsiz depolamada tutulan blob'ları aramak
ve önizlemek için minik, bağımlılıksız bir web uygulaması. Bir **Blob ID**
yapıştırın, bir aggregator seçin; resim, metin, JSON, PDF ve videoları anında
önizleyin — yerel geçmiş ve favorilerle. Uygulamanın kendisi bir **Walrus Site**
olarak deploy edilecek şekilde tasarlandı.

## Özellikler

- 🔎 Herhangi bir Walrus blob'unu Blob ID ile ara
- 🖼️ Resim, metin, JSON, PDF ve video için akıllı önizleme
- 🌐 Değiştirilebilir aggregator'lar (testnet / mainnet / özel uç nokta)
- 🕘 Yerel arama geçmişi (tarayıcında saklanır)
- ⭐ Favori blob'ları sabitle
- 🔗 Paylaşılabilir derin bağlantılar (`#/blob/<id>`)
- 🌗 Koyu / açık tema
- ⚡ Sıfır bağımlılık, sıfır build — saf HTML/CSS/JS

## Hızlı başlangıç

`index.html` dosyasını tarayıcıda açın veya klasörü sunun:

```bash
npm run serve
# ardından http://localhost:4790 adresine gidin
```

## Walrus Sites'a deploy

Uygulamayı `site-builder` ile Walrus'a yayınlamak için
[docs/DEPLOY.md](docs/DEPLOY.md) dosyasına bakın.

## Lisans

MIT © İzzet Çakmak
