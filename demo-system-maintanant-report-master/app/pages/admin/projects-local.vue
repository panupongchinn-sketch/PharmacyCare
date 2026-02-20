<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <!-- Header -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            จัดการโปรเจค (Admin)
          </h1>
          <p class="mt-1 text-sm text-slate-600">
            เก็บข้อมูลไว้ในเบราว์เซอร์ (LocalStorage) — ไม่ใช้ Supabase
          </p>
        </div>
      </div>

      <!-- Projects section -->
      <div class="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-5 sm:p-6">
        <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">จัดการโปรเจค</h2>
        <p class="mt-1 text-sm text-slate-600">
          เพิ่ม แก้ไข จัดลำดับ และตรวจพรีวิวโปรเจคก่อนแสดงผลหน้าบ้าน
        </p>
      </div>

      <!-- Layout -->
      <div class="mt-4 grid gap-6 lg:grid-cols-12">
        <!-- Form -->
        <section class="lg:col-span-5 space-y-6">
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-base font-extrabold">
                  {{ editingId ? "แก้ไขโปรเจค" : "เพิ่มโปรเจคใหม่" }}
                </h2>

                <button
                  v-if="editingId"
                  type="button"
                  class="text-sm font-semibold text-slate-600 hover:text-slate-900"
                  @click="resetForm()"
                >
                  ยกเลิกแก้ไข
                </button>
              </div>
            </div>

            <form class="p-5 space-y-4" @submit.prevent="onSubmit">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-1">
                  ชื่อโปรเจค <span class="text-[#0B4AA2]">*</span>
                </label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  class="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                         focus:ring-2 focus:ring-[#0B4AA2]/20"
                  placeholder="เช่น ระบบลำเลียงสินค้า / ระบบอัตโนมัติ / โครงการติดตั้ง..."
                  required
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-1">
                  รายละเอียด <span class="text-[#0B4AA2]">*</span>
                </label>
                <textarea
                  v-model.trim="form.description"
                  rows="5"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none
                         focus:ring-2 focus:ring-[#0B4AA2]/20"
                  placeholder="อธิบายงาน/ขอบเขต/สถานที่/จุดเด่นแบบย่อ..."
                  required
                ></textarea>
                <div class="mt-1 text-xs text-slate-500">
                  แนะนำ 1–3 บรรทัด อ่านง่าย
                </div>
              </div>

              <!-- ✅ Extra fields (ให้ตรงกับหน้า /product ที่ใช้ category/client/status) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-semibold text-slate-800 mb-1">
                    หมวดหมู่ (Category)
                  </label>
                  <input
                    v-model.trim="form.category"
                    type="text"
                    class="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                           focus:ring-2 focus:ring-[#0B4AA2]/20"
                    placeholder="เช่น Automation / HVAC / Conveyor"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-800 mb-1">
                    ลูกค้า (Client)
                  </label>
                  <input
                    v-model.trim="form.client"
                    type="text"
                    class="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                           focus:ring-2 focus:ring-[#0B4AA2]/20"
                    placeholder="ชื่อบริษัท/หน่วยงาน"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold text-slate-800 mb-1">
                    สถานะ (Status)
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                           focus:ring-2 focus:ring-[#0B4AA2]/20"
                  >
                    <option value="">— ไม่ระบุ —</option>
                    <option value="draft">Draft</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <!-- Image -->
              <div>
                <label class="block text-sm font-semibold text-slate-800 mb-2">
                  รูปภาพ (อัปโหลด)
                </label>

                <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div class="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      class="block w-full text-sm text-slate-600
                             file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2
                             file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
                      @change="onPickImage"
                    />

                    <div class="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        class="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold hover:bg-slate-50"
                        @click="useExampleImage()"
                      >
                        ใช้รูปตัวอย่าง
                      </button>

                      <button
                        v-if="form.imageDataUrl"
                        type="button"
                        class="h-9 rounded-xl border border-slate-300 bg-slate-100 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                        @click="form.imageDataUrl = ''"
                      >
                        ลบรูป
                      </button>
                    </div>

                    <div class="mt-2 text-xs text-slate-500">
                      * รูปจะถูกเก็บเป็น Base64 ใน LocalStorage (เหมาะกับรูปไม่ใหญ่มาก)
                    </div>
                  </div>

                  <!-- Preview thumb -->
                  <div class="w-24 shrink-0 self-start sm:self-auto">
                    <div
                      class="aspect-square rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
                    >
                      <img
                        v-if="form.imageDataUrl"
                        :src="form.imageDataUrl"
                        alt="preview"
                        class="h-full w-full object-cover"
                      />
                      <div v-else class="text-xs text-slate-400 text-center px-2">
                        ไม่มีรูป
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="pt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  class="h-11 w-full sm:flex-1 rounded-xl bg-[#0B4AA2] px-5 text-sm font-extrabold text-white shadow-sm
                         hover:bg-[#083A7E]"
                >
                  {{ editingId ? "บันทึกการแก้ไข" : "เพิ่มโปรเจค" }}
                </button>

                <button
                  type="button"
                  class="h-11 w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold hover:bg-slate-50"
                  @click="resetForm()"
                >
                  ล้างฟอร์ม
                </button>
              </div>

              <!-- Save hint -->
              <div class="text-xs text-slate-500">
                บันทึกแล้วจะแสดงใน “รายการโปรเจค” ด้านขวาทันที
              </div>
            </form>
          </div>

          <!-- Preview card (how it looks on homepage) -->
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <h2 class="text-base font-extrabold">Preview (หน้าบ้าน)</h2>
              <p class="mt-1 text-sm text-slate-600">ตัวอย่างหน้าตาการ์ดโปรเจค</p>
            </div>

            <div class="p-5">
              <div class="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div class="aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    v-if="form.imageDataUrl"
                    :src="form.imageDataUrl"
                    alt="project"
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                    ไม่มีรูป (จะแสดง placeholder)
                  </div>
                </div>

                <div class="p-4 space-y-2">
                  <div class="text-sm font-extrabold text-slate-900 line-clamp-2">
                    {{ form.name || "ชื่อโปรเจค" }}
                  </div>

                  <div class="flex flex-wrap gap-2 text-xs">
                    <span
                      v-if="form.category"
                      class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold"
                    >
                      {{ form.category }}
                    </span>
                    <span
                      v-if="form.client"
                      class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold"
                    >
                      {{ form.client }}
                    </span>
                    <span
                      v-if="form.status"
                      class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold"
                    >
                      {{ form.status }}
                    </span>
                  </div>

                  <div class="text-sm text-slate-600 line-clamp-3">
                    {{ form.description || "รายละเอียดโปรเจค..." }}
                  </div>

                  <div class="pt-2">
                    <span class="text-sm font-semibold text-[#0B4AA2] group-hover:underline">
                      ดูรายละเอียด &gt;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- List -->
        <section class="lg:col-span-7">
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h2 class="text-base font-extrabold">รายการโปรเจค</h2>
                  <p class="mt-1 text-sm text-slate-600">
                    ทั้งหมด <span class="font-extrabold text-slate-900">{{ projects.length }}</span> รายการ
                  </p>
                </div>

                <button
                  v-if="projects.length"
                  type="button"
                  class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  @click="clearAll()"
                >
                  ลบทั้งหมด
                </button>
              </div>
            </div>

            <div class="p-5">
              <div v-if="!projects.length" class="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                <div class="text-lg font-extrabold text-slate-900">ยังไม่มีโปรเจค</div>
                <div class="mt-1 text-sm text-slate-600">เพิ่มจากฟอร์มด้านซ้ายได้เลย</div>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="(p, idx) in projects"
                  :key="p.id"
                  class="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                >
                  <div class="grid sm:grid-cols-12 gap-4 p-4">
                    <div class="sm:col-span-4">
                      <div class="aspect-[16/10] rounded-xl bg-slate-100 overflow-hidden">
                        <img
                          v-if="p.imageDataUrl"
                          :src="p.imageDataUrl"
                          :alt="p.name"
                          class="h-full w-full object-cover"
                        />
                        <div v-else class="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                          ไม่มีรูป
                        </div>
                      </div>
                    </div>

                    <div class="sm:col-span-8">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div class="min-w-0">
                          <div class="font-extrabold text-slate-900 truncate">
                            {{ p.name }}
                          </div>

                          <!-- chips -->
                          <div class="mt-2 flex flex-wrap gap-2 text-xs">
                            <span
                              v-if="p.category"
                              class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold"
                            >
                              {{ p.category }}
                            </span>

                            <span
                              v-if="p.client"
                              class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold"
                            >
                              {{ p.client }}
                            </span>

                            <span
                              v-if="p.status"
                              class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold"
                            >
                              {{ p.status }}
                            </span>
                          </div>

                          <div class="mt-2 text-sm text-slate-600 line-clamp-3">
                            {{ p.description }}
                          </div>

                          <div class="mt-2 text-xs text-slate-500">
                            อัปเดต: {{ formatDate(p.updatedAt) }}
                          </div>
                        </div>

                        <div class="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2 sm:shrink-0">
                          <button
                            type="button"
                            class="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold hover:bg-slate-50"
                            @click="editProject(p.id)"
                          >
                            แก้ไข
                          </button>
                          <button
                            type="button"
                            class="h-9 w-full rounded-xl border border-slate-300 bg-slate-100 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                            @click="removeProject(p.id)"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>

                      <div class="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          class="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 sm:flex-none"
                          :disabled="idx === 0"
                          @click="move(idx, -1)"
                        >
                          ↑ ขึ้น
                        </button>
                        <button
                          type="button"
                          class="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 sm:flex-none"
                          :disabled="idx === projects.length - 1"
                          @click="move(idx, 1)"
                        >
                          ↓ ลง
                        </button>

                        <div class="w-full text-right text-xs text-slate-500 sm:ml-auto sm:w-auto">
                          ลำดับ #{{ idx + 1 }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-2 text-xs text-slate-500">
                  * การเรียงลำดับจะมีผลกับการแสดงผลหน้าบ้าน (ถ้าคุณเอาไปโชว์)
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>

      <!-- Partners logos -->
          <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h3 class="text-base sm:text-lg font-extrabold text-slate-900">Trusted by / Partners</h3>
            <p class="mt-1 text-sm text-slate-600">
              ข้อมูลส่วนนี้ใช้แสดงเฉพาะหัวข้อ Trusted by / Partners ในหน้า `/product`
            </p>
          </div>
          <div class="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h2 class="text-base font-extrabold">โลโก้ลูกค้า/พาร์ทเนอร์</h2>
                  <p class="mt-1 text-sm text-slate-600">
                    ทั้งหมด <span class="font-extrabold text-slate-900">{{ partnerLogos.length }}</span> รายการ
                  </p>
                </div>

                <button
                  v-if="partnerLogos.length"
                  type="button"
                  class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  @click="clearAllPartners()"
                >
                  ลบทั้งหมด
                </button>
              </div>
            </div>

            <div class="p-5 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div class="sm:col-span-4">
                  <label class="block text-sm font-semibold text-slate-800 mb-1">
                    ชื่อลูกค้า/แบรนด์
                  </label>
                  <input
                    v-model.trim="partnerForm.name"
                    type="text"
                    class="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none
                           focus:ring-2 focus:ring-[#0B4AA2]/20"
                    placeholder="เช่น SCG, TOA, DHL"
                  />
                </div>

                <div class="sm:col-span-5">
                  <label class="block text-sm font-semibold text-slate-800 mb-1">
                    รูปโลโก้ <span class="text-[#0B4AA2]">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    class="block w-full text-sm text-slate-600
                           file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2
                           file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
                    @change="onPickPartnerImage"
                  />
                </div>

                <div class="sm:col-span-3 flex items-end">
                  <button
                    type="button"
                    class="h-11 w-full rounded-xl bg-[#0B4AA2] px-5 text-sm font-extrabold text-white shadow-sm hover:bg-[#083A7E]"
                    @click="addPartnerLogo()"
                  >
                    เพิ่มโลโก้
                  </button>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="h-16 w-28 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                  <img
                    v-if="partnerForm.imageDataUrl"
                    :src="partnerForm.imageDataUrl"
                    alt="partner-preview"
                    class="h-full w-full object-contain p-2"
                  />
                  <span v-else class="text-xs text-slate-400">ไม่มีรูป</span>
                </div>
                <p class="text-xs text-slate-500">
                  รองรับไฟล์ภาพทั่วไป และจะบันทึกเป็น Base64 ใน LocalStorage
                </p>
              </div>

              <div v-if="!partnerLogos.length" class="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <div class="text-sm font-semibold text-slate-700">ยังไม่มีโลโก้</div>
                <div class="mt-1 text-xs text-slate-500">เพิ่มโลโก้จากฟอร์มด้านบน</div>
              </div>

              <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div
                  v-for="item in partnerLogos"
                  :key="item.id"
                  class="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div class="h-20 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img :src="item.imageDataUrl" :alt="item.name || 'partner'" class="h-full w-full object-contain p-2" />
                  </div>
                  <div class="mt-2 text-xs font-semibold text-slate-700 truncate">
                    {{ item.name || "ไม่ระบุชื่อ" }}
                  </div>
                  <button
                    type="button"
                    class="mt-2 h-8 w-full rounded-lg border border-slate-300 bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                    @click="removePartnerLogo(item.id)"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact inbox -->
          <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h3 class="text-base sm:text-lg font-extrabold text-slate-900">ข้อความจากลูกค้า</h3>
            <p class="mt-1 text-sm text-slate-600">
              Messages from contact form are stored locally on this browser.
            </p>
          </div>

          <div class="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h2 class="text-base font-extrabold">Contact Messages</h2>
                  <p class="mt-1 text-sm text-slate-600">
                    Total <span class="font-extrabold text-slate-900">{{ contactMessages.length }}</span> messages
                  </p>
                </div>

                <button
                  v-if="contactMessages.length"
                  type="button"
                  class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  @click="clearAllContactMessages()"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div class="p-5">
              <div v-if="!contactMessages.length" class="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <div class="text-sm font-semibold text-slate-700">No messages yet</div>
                <div class="mt-1 text-xs text-slate-500">Messages sent from /contact will appear here</div>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="m in contactMessages"
                  :key="`mobile-${m.id}`"
                  class="rounded-xl border border-slate-200 bg-white p-4 md:hidden"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="font-semibold text-slate-900">{{ m.full_name || "-" }}</div>
                      <div class="text-xs text-slate-500">{{ m.company || "-" }}</div>
                    </div>
                    <button
                      type="button"
                      class="h-8 rounded-lg border border-slate-300 bg-slate-100 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      @click="removeContactMessage(m.id)"
                    >
                      Delete
                    </button>
                  </div>
                  <div class="mt-3 space-y-1 text-xs text-slate-600">
                    <div><span class="font-semibold">Contact:</span> {{ m.phone || "-" }}</div>
                    <div class="break-all"><span class="font-semibold">Email:</span> {{ m.email || "-" }}</div>
                    <div><span class="font-semibold">Subject:</span> {{ m.subject || "-" }}</div>
                    <div class="whitespace-pre-wrap break-words">
                      <span class="font-semibold">Message:</span> {{ m.detail || "-" }}
                    </div>
                    <div><span class="font-semibold">Date:</span> {{ formatDate(m.created_at) }}</div>
                    <div class="break-all"><span class="font-semibold">Source:</span> {{ m.source_page || "/contact" }}</div>
                  </div>
                </div>

                <div class="hidden overflow-hidden rounded-xl border border-slate-200 md:block">
                  <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                    <thead class="bg-slate-100 text-slate-700">
                      <tr>
                        <th class="px-4 py-3 text-left font-bold whitespace-nowrap">Name</th>
                        <th class="px-4 py-3 text-left font-bold whitespace-nowrap">Contact</th>
                        <th class="px-4 py-3 text-left font-bold whitespace-nowrap">Subject</th>
                        <th class="px-4 py-3 text-left font-bold">Message</th>
                        <th class="px-4 py-3 text-left font-bold whitespace-nowrap">Date</th>
                        <th class="px-4 py-3 text-left font-bold whitespace-nowrap">Source</th>
                        <th class="px-4 py-3 text-right font-bold whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white">
                      <tr
                        v-for="m in contactMessages"
                        :key="m.id"
                        class="align-top hover:bg-slate-50/80"
                      >
                        <td class="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                          {{ m.full_name || "-" }}
                          <div class="mt-1 text-xs text-slate-500">
                            {{ m.company || "-" }}
                          </div>
                        </td>
                        <td class="px-4 py-3 text-slate-700 whitespace-nowrap">
                          <div>{{ m.phone || "-" }}</div>
                          <div class="text-xs text-slate-500">{{ m.email || "-" }}</div>
                        </td>
                        <td class="px-4 py-3 text-slate-700 whitespace-nowrap">
                          {{ m.subject || "-" }}
                        </td>
                        <td class="px-4 py-3 text-slate-700 max-w-[360px]">
                          <div class="whitespace-pre-wrap break-words">
                            {{ m.detail || "-" }}
                          </div>
                        </td>
                        <td class="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {{ formatDate(m.created_at) }}
                        </td>
                        <td class="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {{ m.source_page || "/contact" }}
                        </td>
                        <td class="px-4 py-3 text-right">
                          <button
                            type="button"
                            class="h-8 rounded-lg border border-slate-300 bg-slate-100 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                            @click="removeContactMessage(m.id)"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

type ProjectStatus = "draft" | "doing" | "done"

type ProjectRow = {
  id: string
  name: string
  description: string
  category?: string
  client?: string
  status?: ProjectStatus
  imageDataUrl?: string
  createdAt: string
  updatedAt: string
}

type PartnerLogoRow = {
  id: string
  name: string
  imageDataUrl: string
  createdAt: string
  updatedAt: string
}

type ContactMessageRow = {
  id: string
  full_name: string
  phone: string
  company: string
  email: string
  subject: string
  detail: string
  source_page: string
  created_at: string
}

const STORAGE_KEY = "projects"
const PARTNERS_KEY = "partners"
const CONTACT_MESSAGES_KEY = "contact_messages"
const { getValue, setValue } = useSharedStore()

const projects = ref<ProjectRow[]>([])
const partnerLogos = ref<PartnerLogoRow[]>([])
const contactMessages = ref<ContactMessageRow[]>([])
const editingId = ref<string>("")

const form = ref<{
  name: string
  description: string
  category: string
  client: string
  status: "" | ProjectStatus
  imageDataUrl: string
}>({
  name: "",
  description: "",
  category: "",
  client: "",
  status: "",
  imageDataUrl: "",
})

const partnerForm = ref<{
  name: string
  imageDataUrl: string
}>({
  name: "",
  imageDataUrl: "",
})

const nowIso = () => new Date().toISOString()

const isClient = () => typeof window !== "undefined"

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso)
    return d.toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

const loadFromStorage = async () => {
  try {
    const arr = await getValue<ProjectRow>(STORAGE_KEY)
    projects.value = Array.isArray(arr) ? (arr as ProjectRow[]) : []
  } catch {
    projects.value = []
  }
}

const saveToStorage = async () => {
  await setValue<ProjectRow>(STORAGE_KEY, projects.value)
}

const loadPartnersFromStorage = async () => {
  try {
    const arr = await getValue<PartnerLogoRow>(PARTNERS_KEY)
    partnerLogos.value = Array.isArray(arr) ? (arr as PartnerLogoRow[]) : []
  } catch {
    partnerLogos.value = []
  }
}

const savePartnersToStorage = async () => {
  await setValue<PartnerLogoRow>(PARTNERS_KEY, partnerLogos.value)
}

const loadContactMessagesFromStorage = async () => {
  try {
    const arr = await getValue<ContactMessageRow>(CONTACT_MESSAGES_KEY)
    contactMessages.value = Array.isArray(arr) ? (arr as ContactMessageRow[]) : []
  } catch {
    contactMessages.value = []
  }
}

const saveContactMessagesToStorage = async () => {
  await setValue<ContactMessageRow>(CONTACT_MESSAGES_KEY, contactMessages.value)
}

const resetForm = () => {
  editingId.value = ""
  form.value = {
    name: "",
    description: "",
    category: "",
    client: "",
    status: "",
    imageDataUrl: "",
  }
}

const uid = () => {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `p_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const onSubmit = async () => {
  const name = form.value.name.trim()
  const description = form.value.description.trim()
  if (!name || !description) return

  const category = form.value.category.trim() || undefined
  const client = form.value.client.trim() || undefined
  const status = form.value.status || undefined
  const imageDataUrl = form.value.imageDataUrl || ""

  if (editingId.value) {
    const i = projects.value.findIndex((x) => x.id === editingId.value)
    if (i >= 0) {
      const current = projects.value[i]
      if (!current) return
      const updated: ProjectRow = {
        ...current,
        name,
        description,
        category,
        client,
        status,
        imageDataUrl,
        updatedAt: nowIso(),
      }
      projects.value.splice(i, 1, updated)
      await saveToStorage()
      resetForm()
      return
    }
  }

  const row: ProjectRow = {
    id: uid(),
    name,
    description,
    category,
    client,
    status,
    imageDataUrl,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }

  projects.value = [row, ...projects.value]
  await saveToStorage()
  resetForm()
}

const editProject = (id: string) => {
  const p = projects.value.find((x) => x.id === id)
  if (!p) return
  editingId.value = id
  form.value = {
    name: p.name,
    description: p.description,
    category: p.category || "",
    client: p.client || "",
    status: (p.status as ProjectStatus) || "",
    imageDataUrl: p.imageDataUrl || "",
  }
  if (isClient()) window.scrollTo({ top: 0, behavior: "smooth" })
}

const removeProject = async (id: string) => {
  if (!isClient()) return
  if (!window.confirm("ลบโปรเจคนี้ใช่ไหม?")) return
  projects.value = projects.value.filter((x) => x.id !== id)
  await saveToStorage()
  if (editingId.value === id) resetForm()
}

const clearAll = async () => {
  if (!isClient()) return
  if (!window.confirm("ลบทั้งหมดใช่ไหม?")) return
  projects.value = []
  await saveToStorage()
  resetForm()
}

const move = async (index: number, delta: number) => {
  const next = index + delta
  if (next < 0 || next >= projects.value.length) return
  const arr = projects.value.slice()
  const item = arr[index]
  if (!item) return
  arr.splice(index, 1)
  arr.splice(next, 0, item)
  projects.value = arr
  await saveToStorage()
}

const onPickImage = async (e: Event) => {
  if (!isClient()) return
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return

  const maxMB = 2
  if (file.size > maxMB * 1024 * 1024) {
    window.alert(`รูปใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
    if (input) input.value = ""
    return
  }

  const dataUrl = await fileToDataUrl(file)
  form.value.imageDataUrl = dataUrl
  if (input) input.value = ""
}

const onPickPartnerImage = async (e: Event) => {
  if (!isClient()) return
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return

  const maxMB = 2
  if (file.size > maxMB * 1024 * 1024) {
    window.alert(`รูปใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
    if (input) input.value = ""
    return
  }

  partnerForm.value.imageDataUrl = await fileToDataUrl(file)
  if (input) input.value = ""
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const useExampleImage = async () => {
  if (!isClient()) return
  form.value.imageDataUrl = await fetchToDataUrl("/factory-layout.jpg")
}

const fetchToDataUrl = async (url: string) => {
  const res = await fetch(url)
  const blob = await res.blob()
  const f = new File([blob], "img", { type: blob.type })
  return await fileToDataUrl(f)
}

const addPartnerLogo = async () => {
  const imageDataUrl = partnerForm.value.imageDataUrl || ""
  if (!imageDataUrl) {
    if (isClient()) window.alert("กรุณาเลือกรูปโลโก้ก่อน")
    return
  }

  const row: PartnerLogoRow = {
    id: uid(),
    name: partnerForm.value.name.trim(),
    imageDataUrl,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }

  partnerLogos.value = [row, ...partnerLogos.value]
  await savePartnersToStorage()
  partnerForm.value = { name: "", imageDataUrl: "" }
}

const removePartnerLogo = async (id: string) => {
  if (!isClient()) return
  if (!window.confirm("ลบโลโก้นี้ใช่ไหม?")) return
  partnerLogos.value = partnerLogos.value.filter((x) => x.id !== id)
  await savePartnersToStorage()
}

const clearAllPartners = async () => {
  if (!isClient()) return
  if (!window.confirm("ลบโลโก้ทั้งหมดใช่ไหม?")) return
  partnerLogos.value = []
  await savePartnersToStorage()
}

const removeContactMessage = async (id: string) => {
  if (!isClient()) return
  if (!window.confirm("Delete this message?")) return
  contactMessages.value = contactMessages.value.filter((x) => x.id !== id)
  await saveContactMessagesToStorage()
}

const clearAllContactMessages = async () => {
  if (!isClient()) return
  if (!window.confirm("Delete all messages?")) return
  contactMessages.value = []
  await saveContactMessagesToStorage()
}

onMounted(() => {
  Promise.all([
    loadFromStorage(),
    loadPartnersFromStorage(),
    loadContactMessagesFromStorage(),
  ])
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

