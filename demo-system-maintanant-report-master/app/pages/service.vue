<template>
  <div class="relative -mx-4 -my-8 min-h-[calc(100vh-120px)] overflow-hidden sm:-mx-6 lg:-mx-10">
    <section class="relative isolate overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/factory-layout.jpg');" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-950/88 via-emerald-900/75 to-emerald-700/62" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div class="max-w-3xl">
          <p class="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
            Pharmacy Services
          </p>
          <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            บริการดูแลสุขภาพและให้คำแนะนำการใช้ยา
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-100 sm:text-base">
            เราพร้อมให้ข้อมูลการเลือกใช้ยาเบื้องต้น แนะนำเวชภัณฑ์ที่เหมาะสม และช่วยวางแผนการดูแลสุขภาพประจำบ้าน
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/contact"
              class="inline-flex h-11 items-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-lg transition-colors hover:bg-emerald-700"
            >
              ติดต่อเพื่อปรึกษา
            </NuxtLink>
            <NuxtLink
              to="/product"
              class="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              ดูรายการสินค้า
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-slate-100 px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-7xl">
        <div class="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ขอบเขตบริการหลัก</h2>
            <p class="mt-1 text-sm text-slate-600">บริการสำหรับลูกค้าทั่วไปและครอบครัว</p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <span class="text-sm font-extrabold">{{ service.short }}</span>
            </div>
            <h3 class="mt-4 text-base font-extrabold text-slate-900">{{ service.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ service.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ขั้นตอนการให้บริการ</h2>
          <p class="mt-1 text-sm text-slate-600">ให้คำแนะนำอย่างเป็นระบบและติดตามผลได้</p>

          <div class="mt-6 space-y-3">
            <div
              v-for="(step, idx) in workflow"
              :key="step.title"
              class="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-extrabold text-white">
                {{ idx + 1 }}
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900">{{ step.title }}</h3>
                <p class="mt-1 text-sm text-slate-600">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-slate-200 bg-emerald-900 p-6 text-slate-100 shadow-lg">
            <h3 class="text-lg font-extrabold">ทำไมควรเลือก Pharmacy Care</h3>

            <ul class="mt-4 space-y-3 text-sm text-slate-200">
              <li v-for="item in highlights" :key="item" class="flex items-start gap-3">
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-300"></span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              class="mt-6 inline-flex h-10 items-center rounded-lg bg-emerald-300 px-4 text-sm font-bold text-emerald-900 transition hover:bg-emerald-200"
            >
              ติดต่อเภสัชกร
            </NuxtLink>
          </div>

          <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h4 class="text-sm font-extrabold text-slate-900">เวลาทำการ</h4>
            <p class="mt-2 text-sm text-slate-600">
              ให้บริการทุกวัน 09:00-20:00 พร้อมช่องทางติดต่อออนไลน์สำหรับสอบถามข้อมูลยา
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "บริการ | Pharmacy Care",
})

const services = [
  {
    short: "01",
    title: "แนะนำการใช้ยาเบื้องต้น",
    description: "ช่วยแนะนำวิธีใช้ยาและช่วงเวลาที่เหมาะสมตามข้อมูลผลิตภัณฑ์",
  },
  {
    short: "02",
    title: "จัดชุดยาสามัญประจำบ้าน",
    description: "คัดรายการยาพื้นฐานและอุปกรณ์ปฐมพยาบาลให้เหมาะกับสมาชิกในบ้าน",
  },
  {
    short: "03",
    title: "ตรวจเช็กสต็อกและวันหมดอายุ",
    description: "ช่วยจัดระบบรายการยาเพื่อให้ติดตามปริมาณคงเหลือและวันหมดอายุได้ง่าย",
  },
  {
    short: "04",
    title: "ให้คำปรึกษาก่อนซื้อ",
    description: "ตอบคำถามก่อนเลือกสินค้า เพื่อให้ได้ตัวเลือกที่ตรงกับอาการและการใช้งาน",
  },
]

const workflow = [
  {
    title: "รับข้อมูลเบื้องต้น",
    description: "สอบถามอาการหรือความต้องการเพื่อคัดสินค้าที่เหมาะสม",
  },
  {
    title: "แนะนำตัวเลือกสินค้า",
    description: "เสนอสินค้าในหมวดที่เกี่ยวข้อง พร้อมข้อมูลวิธีใช้",
  },
  {
    title: "ยืนยันรายการ",
    description: "ตรวจสอบจำนวน หน่วย ราคา และสต็อกก่อนยืนยัน",
  },
  {
    title: "ดูแลหลังการซื้อ",
    description: "เปิดช่องทางให้ลูกค้าติดต่อสอบถามเพิ่มเติมได้",
  },
]

const highlights = [
  "หน้าเว็บค้นหาสินค้าและดูรายละเอียดได้ง่าย",
  "มีระบบจัดการสต็อกสำหรับผู้ดูแลร้าน",
  "ข้อมูลสินค้าเป็นหมวดหมู่ ช่วยตัดสินใจได้เร็ว",
  "มีช่องทางติดต่อสอบถามและรับคำแนะนำ",
]
</script>
