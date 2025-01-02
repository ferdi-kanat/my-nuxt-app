<template>
  <div class="product-slider">
    <swiper
      :slidesPerView="4"
      :spaceBetween="20"
      :navigation="true"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="product-card">
          <div class="product-image">
            <NuxtLink :to="product.link">
              <img :src="product.image" :alt="product.name">
              <div v-if="product.discount" class="sale-badge">
              </div>
            </NuxtLink>
          </div>
          
          <div class="product-colors">
            <div v-for="color in product.colors" 
                 :key="color.id" 
                 class="color-option">
              <img :src="color.image" :alt="color.name">
            </div>
          </div>

          <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price">
              <span class="discounted-price">{{ formatPrice(product.discountedPrice) }} TL</span>
              <span v-if="product.originalPrice" class="original-price">
                {{ formatPrice(product.originalPrice) }} TL
              </span>
            </div>
            <NuxtLink :to="product.link" class="buy-button">
              Satın Al
            </NuxtLink>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface Color {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  link: string;
  colors: Color[];
  discountedPrice: number;
  originalPrice?: number;
  discount: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "CSC Nature And Back Erkek Sweatshirt Sarı",
    image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/CS0329_756-0-240924074019781.jpg",
    link: "/products/bal-sarisi-csc-nature-and-back-erkek-sweatshirt-p-37479",
    colors: [
      {
        id: 1,
        name: "Siyah",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
      },
      {
        id: 2,
        name: "Bal Sarısı",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/bal-sarisi_1109-231107193323920.jpeg"
      },
    { id:3,
      name: "Kiremit",
      image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/kiremit_1196-231107193842012.jpeg"
    },
    { id:4,
      name: "Yeşil",
      image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_896-231107193122545.jpeg"
    }
    ],
    discountedPrice: 2309.95,
    originalPrice: 4199.90,
    discount: true
  },
  {
    id: 39123,
    name: "Alpine Chill Zero Erkek Kısa Kollu T-Shirt Yeşil",
    image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/AO3561_349-0-240927071057988.jpg",
    link: "/products/yesil-alpine-chill-zero-erkek-kisa-kollu-t-shirt-p-39123",
    colors: [
      {
        id: 1,
        name: "PFG Gri",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/pfg-gri_1256-231107194153565.jpeg"
      },
      {
        id: 2,
        name: "Lacivert",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_851-231107193113920.jpeg"
      },
      {
        id: 3,
        name: "Beyaz",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/beyaz_1021-231107193126654.jpeg"
      },
      {
        id: 4,
        name: "Siyah",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
      },
      {
        id: 5,
        name: "Yeşil",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_1704-240215080120005.jpeg"
      }
    ],
    discountedPrice: 1649.95,
    originalPrice: 2999.90,
    discount: true
  },
  {
    id: 39199,
    name: "Youth Drainmaker XTR Çocuk Ayakkabı Siyah",
    image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/BY1156_010-0-240924071924960.jpg",
    link: "/products/siyah-youth-drainmaker-xtr-cocuk-ayakkabi-p-39199",
    colors: [
      {
        id: 1,
        name: "Siyah",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/siyah_823-231107193058852.jpeg"
      }
    ],
    discountedPrice: 2914.95,
    originalPrice: 5299.90,
    discount: true
  },
  {
    id: 38562,
    name: "Columbia Hike Crew Erkek Kısa Kollu T-Shirt Siyah",
    image: "https://img-phantomcolumbia.mncdn.com/mnresize/247/-/img/assets/base/originals/AO1419_011-0-240927070949534.jpg",
    link: "/products/siyah-columbia-hike-crew-erkek-kisa-kollu-t-shirt-p-38562",
    colors: [
      {
        id: 1,
        name: "Lacivert",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_851-231107193113920.jpeg"
      },
      {
        id: 2,
        name: "Bordo",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/bordo_842-231107193110579.jpeg"
      },
      {
        id: 3,
        name: "Yeşil",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/yesil_1274-231107194205159.jpeg"
      },
      {
        id: 4,
        name: "Lacivert",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/lacivert_1295-231107194226557.jpeg"
      },
      {
        id: 5,
        name: "Koyu Gri",
        image: "https://img-phantomcolumbia.mncdn.com/mnresize/24/-/img/colors/koyu-gri_853-231107193114393.jpeg"
      }
    ],
    discountedPrice: 989.95,
    originalPrice: 1799.90,
    discount: true
  },
  // Diğer ürünler buraya eklenebilir
];

const formatPrice = (price: number) => {
  return price.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
</script>

<style scoped>
.product-slider {
  padding: 20px;
}

.product-card {
  border: 1px solid #eaebed;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sale-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.product-colors {
  display: flex;
  gap: 5px;
  padding: 10px;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.color-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 15px;
}

.product-name {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.discounted-price {
  font-weight: bold;
  color: #000;
}

.original-price {
  text-decoration: line-through;
  color: #999;
}

.buy-button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #333;
}
</style>