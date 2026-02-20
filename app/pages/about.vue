<template>
  <div class="space-y-10">
    <section>
      <div class="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div class="relative h-64 overflow-hidden rounded-2xl bg-cover bg-center sm:h-80 lg:h-96" style="background-image: url('/recommend-factory-type-1.jpg')">
          <div class="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-emerald-900/15 to-emerald-900/55"></div>

          <div class="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
            <div class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white">
              <span class="text-lg font-extrabold">Rx</span>
            </div>
          </div>

          <div class="absolute inset-x-0 top-[24%] px-5 text-center text-white sm:px-10">
            <h1 class="text-2xl font-extrabold tracking-tight drop-shadow md:text-4xl">Pharmacy Care</h1>
            <p class="mt-3 text-xl font-extrabold tracking-wide drop-shadow md:text-5xl">ร้านขายยาเพื่อสุขภาพครอบครัว</p>
          </div>

          <div class="absolute inset-x-0 bottom-6 px-4 sm:bottom-10 sm:px-8">
            <div class="mx-auto max-w-4xl text-center text-sm font-bold text-white drop-shadow sm:text-2xl">
              <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                <span>Email : pharmacycare@example.com</span>
                <span>Tel : 02-517-0688</span>
              </div>
            </div>

            <div class="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
              <a href="#about-content" class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-emerald-800 hover:bg-emerald-50">
                เกี่ยวกับเรา
              </a>
              <NuxtLink to="/product" class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-emerald-800 hover:bg-emerald-50">
                สินค้า
              </NuxtLink>
              <NuxtLink to="/contact" class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-emerald-800 hover:bg-emerald-50">
                ติดต่อเรา
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about-content" class="mx-auto max-w-5xl px-4 pb-8 text-center sm:px-6">
      <h2 class="text-2xl font-extrabold text-emerald-800 sm:text-3xl">เกี่ยวกับร้านขายยา</h2>
      <p class="mt-4 text-base leading-8 text-slate-700">
        Pharmacy Care มุ่งเน้นการดูแลสุขภาพของทุกคนในครอบครัว ด้วยการคัดสรรยาและเวชภัณฑ์ที่จำเป็น
        พร้อมข้อมูลประกอบการเลือกใช้ที่เข้าใจง่ายและชัดเจน
      </p>
      <p class="mt-4 text-base leading-8 text-slate-700">
        เราออกแบบระบบหน้าเว็บให้ค้นหาสินค้าได้สะดวก ตรวจสอบสต็อกได้รวดเร็ว และมีช่องทางติดต่อเพื่อรับคำแนะนำเพิ่มเติม
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "เกี่ยวกับเรา | Pharmacy Care" })
</script>
