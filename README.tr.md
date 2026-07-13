# 🦭 Morsu

**[morsu.xyz](https://morsu.xyz)** — [Walrus](https://walrus.xyz) merkeziyetsiz
depolamada tutulan blob'ları aramak ve önizlemek için minik, bağımlılıksız bir
web uygulaması. Bir **Blob ID** yapıştırın, bir aggregator seçin; resim, metin,
JSON, PDF ve videoları anında önizleyin — yerel geçmiş ve favorilerle.
Uygulamanın kendisi bir **Walrus Site** olarak deploy edilecek şekilde
tasarlandı.

> *Morsu* adı, Türkçe **“mors”** (walrus) kelimesinden gelir (Fince *mursu*'ya
> da bir selam).

## Özellikler

- 🔎 Herhangi bir Walrus blob'unu Blob ID ile ara
- 🖼️ Resim, metin, JSON, PDF ve video için akıllı önizleme
- 🌐 Değiştirilebilir aggregator'lar (testnet / mainnet / özel uç nokta)
- 🕘 Yerel arama geçmişi (tarayıcında saklanır)
- ⭐ Favori blob'ları sabitle
- 🔗 Paylaşılabilir derin bağlantılar (`#/blob/<id>`)
- 🌗 Koyu / açık tema
- 🌍 Çift dilli arayüz — İngilizce (varsayılan) ve Türkçe, tek tıkla geçiş
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

## Yazar

[@izzetcakmak](https://github.com/izzetcakmak) tarafından Walrus üzerinde geliştirildi.
İletişim: [info@morsu.xyz](mailto:info@morsu.xyz)

Sahip Sui cüzdanı (site objesi sahipliği ve ilişkilendirme):

```
0xc7db10a90785f797f180611b1646710dbc313de6b6736273823d775f80a3d840
```

## Lisans

MIT © İzzet Çakmak
