<template>
  <div class="relative -mx-4 -my-8 min-h-[calc(100vh-120px)] overflow-hidden sm:-mx-6 lg:-mx-10">
    <section class="relative isolate overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/factory-layout.jpg');"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70"
        aria-hidden="true"
      ></div>
      <div class="industrial-grid absolute inset-0 opacity-30" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div class="max-w-3xl">
          <p class="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Industrial Services
          </p>
          <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            บริการวิศวกรรมและระบบอัตโนมัติครบวงจร
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
            เราออกแบบ ติดตั้ง และดูแลระบบเครื่องจักรอุตสาหกรรม ตั้งแต่วิเคราะห์หน้างานจนส่งมอบพร้อมใช้งาน
            โดยเน้นความปลอดภัย มาตรฐาน และประสิทธิภาพการผลิต
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/contact"
              class="inline-flex h-11 items-center rounded-full bg-[#0B4AA2] px-6 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#083A7E]"
            >
              ขอใบเสนอราคา
            </NuxtLink>
            <NuxtLink
              to="/product"
              class="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              ดูผลงานโครงการ
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
            <p class="mt-1 text-sm text-slate-600">บริการแบบ Turnkey สำหรับโรงงานและสายการผลิต</p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#0B4AA2]">
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
          <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">ขั้นตอนการทำงาน</h2>
          <p class="mt-1 text-sm text-slate-600">กระบวนการชัดเจน ตรวจสอบได้ทุกช่วงงาน</p>

          <div class="mt-6 space-y-3">
            <div
              v-for="(step, idx) in workflow"
              :key="step.title"
              class="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B4AA2] text-xs font-extrabold text-white">
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
          <div class="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-lg">
            <h3 class="text-lg font-extrabold">ทำไมลูกค้าอุตสาหกรรมเลือกเรา</h3>

            <ul class="mt-4 space-y-3 text-sm text-slate-200">
              <li
                v-for="item in highlights"
                :key="item"
                class="flex items-start gap-3"
              >
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300"></span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              class="mt-6 inline-flex h-10 items-center rounded-lg bg-cyan-400 px-4 text-sm font-bold text-slate-900 transition hover:bg-cyan-300"
            >
              ปรึกษาทีมวิศวกร
            </NuxtLink>
          </div>

          <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h4 class="text-sm font-extrabold text-slate-900">Service Coverage</h4>
            <p class="mt-2 text-sm text-slate-600">
              รองรับงานติดตั้งและบำรุงรักษาในโรงงานอุตสาหกรรมทั่วประเทศ พร้อมทีมซัพพอร์ตหลังส่งมอบ
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "บริการ | YUSHI Industrial",
})

const services = [
  {
    short: "01",
    title: "ออกแบบระบบอัตโนมัติ",
    description:
      "วิเคราะห์กระบวนการผลิต ออกแบบระบบควบคุม PLC/HMI และวางโครงสร้างไฟฟ้าให้เหมาะกับหน้างานจริง",
  },
  {
    short: "02",
    title: "ติดตั้งเครื่องจักรและไลน์ผลิต",
    description:
      "ติดตั้งเครื่องจักร ลำเลียง และอุปกรณ์ประกอบ พร้อมทดสอบความพร้อมใช้งานก่อนส่งมอบ",
  },
  {
    short: "03",
    title: "Maintenance & Overhaul",
    description:
      "บำรุงรักษาเชิงป้องกันและปรับปรุงระบบเดิมเพื่อลด Downtime และเพิ่มเสถียรภาพการผลิต",
  },
  {
    short: "04",
    title: "Energy & Safety Upgrade",
    description:
      "ปรับปรุงระบบให้ปลอดภัยและประหยัดพลังงาน สอดคล้องมาตรฐานที่โรงงานกำหนด",
  },
]

const workflow = [
  {
    title: "สำรวจหน้างานและเก็บ Requirement",
    description: "เข้าไซต์งาน วิเคราะห์ปัญหา และกำหนดเป้าหมายร่วมกับทีมลูกค้า",
  },
  {
    title: "ออกแบบวิศวกรรมและแผนดำเนินงาน",
    description: "จัดทำแบบ ระบบควบคุม และแผนติดตั้งเพื่อให้หยุดไลน์น้อยที่สุด",
  },
  {
    title: "ติดตั้ง ทดสอบ และ Commissioning",
    description: "ติดตั้งตามมาตรฐาน พร้อมทดสอบฟังก์ชันจริงก่อนเปิดใช้งาน",
  },
  {
    title: "ส่งมอบและดูแลหลังการขาย",
    description: "อบรมผู้ใช้งาน ส่งเอกสารครบถ้วน และมีทีมซัพพอร์ตต่อเนื่อง",
  },
]

const highlights = [
  "ทีมงานวิศวกรและช่างเทคนิคมีประสบการณ์งานโรงงานอุตสาหกรรม",
  "วางแผนงานร่วมกับ Production เพื่อกระทบการผลิตน้อยที่สุด",
  "มีเอกสารและรายงานความคืบหน้าชัดเจนตลอดโครงการ",
  "รองรับการดูแลระยะยาวและแผน PM ตามความต้องการของลูกค้า",
]
</script>

<style scoped>
.industrial-grid {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.17) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.17) 1px, transparent 1px);
  background-size: 44px 44px;
  background-position: center;
}
</style>
