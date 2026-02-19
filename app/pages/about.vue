<template>
  <div class="space-y-10">
    <section>
      <div class="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div
          class="relative h-64 overflow-hidden rounded-2xl bg-center bg-cover sm:h-80 lg:h-96"
          style="background-image: url('/recommend-factory-type-1.jpg')"
        >

          <div class="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-slate-900/45"></div>

          <div class="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
            <img src="/MBLogo.png" alt="logo" class="h-10 w-auto sm:h-14" />
          </div>

          <div class="absolute inset-x-0 top-[24%] px-5 text-center text-white sm:px-10">
            <h1 class="text-2xl font-extrabold tracking-tight drop-shadow md:text-4xl">
              YUSHI INDUSTRIAL COMPANY LIMITED
            </h1>
            <p class="mt-3 text-xl font-extrabold tracking-wide drop-shadow md:text-5xl">
              YUSHI INDUSTRIAL CO., LTD.
            </p>
          </div>

          <div class="absolute inset-x-0 bottom-6 px-4 sm:bottom-10 sm:px-8">
            <div class="mx-auto max-w-4xl text-center text-sm font-bold text-white drop-shadow sm:text-3xl">
              <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                <span>Email : info@yushi.co.th</span>
                <span>Tel : 02-517-0688</span>
              </div>
            </div>

            <div class="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href="#about-content"
                class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0B4AA2] hover:bg-slate-100"
              >
                About Us
              </a>
              <NuxtLink
                to="/product"
                class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0B4AA2] hover:bg-slate-100"
              >
                Products
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0B4AA2] hover:bg-slate-100"
              >
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about-content" class="mx-auto max-w-5xl px-4 pb-8 text-center sm:px-6">
      <h2 class="text-2xl font-extrabold text-[#0B4AA2] sm:text-3xl">About Our Company</h2>
      <p class="mt-4 text-base leading-8 text-slate-700">
        YUSHI INDUSTRIAL provides industrial systems and equipment solutions,
        from design and installation to preventive maintenance.
        We focus on quality, safety, and on-time delivery to keep client operations stable and efficient.
      </p>
      <p class="mt-4 text-base leading-8 text-slate-700">
        Our engineering team works closely with each customer to build practical solutions
        tailored to real production requirements and long-term performance.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "About Us | YUSHI INDUSTRIAL" })
</script>
