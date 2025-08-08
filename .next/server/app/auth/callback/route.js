/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/auth/callback/route";
exports.ids = ["app/auth/callback/route"];
exports.modules = {

/***/ "(rsc)/./app/auth/callback/route.ts":
/*!************************************!*\
  !*** ./app/auth/callback/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase/server */ \"(rsc)/./lib/supabase/server.ts\");\n\n\nfunction toSlug(input) {\n    return input.toLowerCase().replace(/[^a-z0-9]+/g, \"-\").replace(/(^-|-$)+/g, \"\");\n}\nasync function ensureProfile() {\n    const supabase = await (0,_lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__.getServerClient)();\n    const { data: { user } } = await supabase.auth.getUser();\n    if (!user) return;\n    // 이미 프로필이 있으면 종료\n    const { data: existing } = await supabase.from(\"profiles\").select(\"id\").eq(\"id\", user.id).maybeSingle();\n    if (existing) return;\n    const metaNickname = user.user_metadata?.nickname;\n    const fullName = user.user_metadata?.full_name;\n    const emailLocal = user.email?.split(\"@\")[0];\n    const base = metaNickname || fullName || emailLocal || `user-${user.id.slice(0, 8)}`;\n    let candidate = toSlug(base).slice(0, 24) || `user-${user.id.slice(0, 8)}`;\n    // 이미 존재하면 무시하도록 시도 -> 충돌 시 접미사 부여 후 최대 3회 재시도\n    for(let i = 0; i < 3; i++){\n        const { error } = await supabase.from(\"profiles\").insert({\n            id: user.id,\n            nickname: candidate\n        });\n        if (!error) return;\n        candidate = `${candidate}-${Math.floor(Math.random() * 9000 + 1000)}`.slice(0, 24);\n    }\n}\nasync function GET(req) {\n    const { searchParams, origin } = new URL(req.url);\n    const code = searchParams.get(\"code\");\n    const next = \"/\";\n    const supabase = await (0,_lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__.getServerClient)();\n    if (code) {\n        try {\n            const { error } = await supabase.auth.exchangeCodeForSession(code);\n            if (!error) {\n                await supabase.auth.getSession();\n                await ensureProfile();\n            }\n        } catch  {\n        // 무시하고 홈으로 이동\n        }\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`${origin}${next}`);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXV0aC9jYWxsYmFjay9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDYTtBQUV4RCxTQUFTRSxPQUFPQyxLQUFhO0lBQzNCLE9BQU9BLE1BQ0pDLFdBQVcsR0FDWEMsT0FBTyxDQUFDLGVBQWUsS0FDdkJBLE9BQU8sQ0FBQyxhQUFhO0FBQzFCO0FBRUEsZUFBZUM7SUFDYixNQUFNQyxXQUFXLE1BQU1OLHFFQUFlQTtJQUN0QyxNQUFNLEVBQ0pPLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEVBQ2YsR0FBRyxNQUFNRixTQUFTRyxJQUFJLENBQUNDLE9BQU87SUFDL0IsSUFBSSxDQUFDRixNQUFNO0lBRVgsaUJBQWlCO0lBQ2pCLE1BQU0sRUFBRUQsTUFBTUksUUFBUSxFQUFFLEdBQUcsTUFBTUwsU0FDOUJNLElBQUksQ0FBQyxZQUNMQyxNQUFNLENBQUMsTUFDUEMsRUFBRSxDQUFDLE1BQU1OLEtBQUtPLEVBQUUsRUFDaEJDLFdBQVc7SUFDZCxJQUFJTCxVQUFVO0lBRWQsTUFBTU0sZUFBZ0JULEtBQUtVLGFBQWEsRUFBVUM7SUFHbEQsTUFBTUMsV0FBWVosS0FBS1UsYUFBYSxFQUFVRztJQUM5QyxNQUFNQyxhQUFhZCxLQUFLZSxLQUFLLEVBQUVDLE1BQU0sSUFBSSxDQUFDLEVBQUU7SUFFNUMsTUFBTUMsT0FDSlIsZ0JBQWdCRyxZQUFZRSxjQUFjLENBQUMsS0FBSyxFQUFFZCxLQUFLTyxFQUFFLENBQUNXLEtBQUssQ0FBQyxHQUFHLElBQUk7SUFDekUsSUFBSUMsWUFBWTFCLE9BQU93QixNQUFNQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFbEIsS0FBS08sRUFBRSxDQUFDVyxLQUFLLENBQUMsR0FBRyxJQUFJO0lBRTFFLDhDQUE4QztJQUM5QyxJQUFLLElBQUlFLElBQUksR0FBR0EsSUFBSSxHQUFHQSxJQUFLO1FBQzFCLE1BQU0sRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTXZCLFNBQ3JCTSxJQUFJLENBQUMsWUFDTGtCLE1BQU0sQ0FBQztZQUFFZixJQUFJUCxLQUFLTyxFQUFFO1lBQUVJLFVBQVVRO1FBQVU7UUFDN0MsSUFBSSxDQUFDRSxPQUFPO1FBQ1pGLFlBQVksR0FBR0EsVUFBVSxDQUFDLEVBQUVJLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLLE9BQU8sT0FBTyxDQUFDUCxLQUFLLENBQ3pFLEdBQ0E7SUFFSjtBQUNGO0FBRU8sZUFBZVEsSUFBSUMsR0FBWTtJQUNwQyxNQUFNLEVBQUVDLFlBQVksRUFBRUMsTUFBTSxFQUFFLEdBQUcsSUFBSUMsSUFBSUgsSUFBSUksR0FBRztJQUNoRCxNQUFNQyxPQUFPSixhQUFhSyxHQUFHLENBQUM7SUFDOUIsTUFBTUMsT0FBTztJQUViLE1BQU1wQyxXQUFXLE1BQU1OLHFFQUFlQTtJQUV0QyxJQUFJd0MsTUFBTTtRQUNSLElBQUk7WUFDRixNQUFNLEVBQUVYLEtBQUssRUFBRSxHQUFHLE1BQU12QixTQUFTRyxJQUFJLENBQUNrQyxzQkFBc0IsQ0FBQ0g7WUFDN0QsSUFBSSxDQUFDWCxPQUFPO2dCQUNWLE1BQU12QixTQUFTRyxJQUFJLENBQUNtQyxVQUFVO2dCQUM5QixNQUFNdkM7WUFDUjtRQUNGLEVBQUUsT0FBTTtRQUNOLGNBQWM7UUFDaEI7SUFDRjtJQUVBLE9BQU9OLHFEQUFZQSxDQUFDOEMsUUFBUSxDQUFDLEdBQUdSLFNBQVNLLE1BQU07QUFDakQiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGgvRG9jdW1lbnRzL0NvZGluZy9zanByb2plY3Qvd2VsbG5lc3MtYXBwL2FwcC9hdXRoL2NhbGxiYWNrL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZ2V0U2VydmVyQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuXG5mdW5jdGlvbiB0b1NsdWcoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnB1dFxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1teYS16MC05XSsvZywgXCItXCIpXG4gICAgLnJlcGxhY2UoLyheLXwtJCkrL2csIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVQcm9maWxlKCkge1xuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGdldFNlcnZlckNsaWVudCgpO1xuICBjb25zdCB7XG4gICAgZGF0YTogeyB1c2VyIH0sXG4gIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSByZXR1cm47XG5cbiAgLy8g7J2066+4IO2UhOuhnO2VhOydtCDsnojsnLzrqbQg7KKF66OMXG4gIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJwcm9maWxlc1wiKVxuICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgIC5lcShcImlkXCIsIHVzZXIuaWQpXG4gICAgLm1heWJlU2luZ2xlKCk7XG4gIGlmIChleGlzdGluZykgcmV0dXJuO1xuXG4gIGNvbnN0IG1ldGFOaWNrbmFtZSA9ICh1c2VyLnVzZXJfbWV0YWRhdGEgYXMgYW55KT8ubmlja25hbWUgYXNcbiAgICB8IHN0cmluZ1xuICAgIHwgdW5kZWZpbmVkO1xuICBjb25zdCBmdWxsTmFtZSA9ICh1c2VyLnVzZXJfbWV0YWRhdGEgYXMgYW55KT8uZnVsbF9uYW1lIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgY29uc3QgZW1haWxMb2NhbCA9IHVzZXIuZW1haWw/LnNwbGl0KFwiQFwiKVswXTtcblxuICBjb25zdCBiYXNlID1cbiAgICBtZXRhTmlja25hbWUgfHwgZnVsbE5hbWUgfHwgZW1haWxMb2NhbCB8fCBgdXNlci0ke3VzZXIuaWQuc2xpY2UoMCwgOCl9YDtcbiAgbGV0IGNhbmRpZGF0ZSA9IHRvU2x1ZyhiYXNlKS5zbGljZSgwLCAyNCkgfHwgYHVzZXItJHt1c2VyLmlkLnNsaWNlKDAsIDgpfWA7XG5cbiAgLy8g7J2066+4IOyhtOyerO2VmOuptCDrrLTsi5ztlZjrj4TroZ0g7Iuc64+EIC0+IOy2qeuPjCDsi5wg7KCR66+47IKsIOu2gOyXrCDtm4Qg7LWc64yAIDPtmowg7J6s7Iuc64+EXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwicHJvZmlsZXNcIilcbiAgICAgIC5pbnNlcnQoeyBpZDogdXNlci5pZCwgbmlja25hbWU6IGNhbmRpZGF0ZSB9KTtcbiAgICBpZiAoIWVycm9yKSByZXR1cm47XG4gICAgY2FuZGlkYXRlID0gYCR7Y2FuZGlkYXRlfS0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAgKyAxMDAwKX1gLnNsaWNlKFxuICAgICAgMCxcbiAgICAgIDI0XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCB7IHNlYXJjaFBhcmFtcywgb3JpZ2luIH0gPSBuZXcgVVJMKHJlcS51cmwpO1xuICBjb25zdCBjb2RlID0gc2VhcmNoUGFyYW1zLmdldChcImNvZGVcIik7XG4gIGNvbnN0IG5leHQgPSBcIi9cIjtcblxuICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGdldFNlcnZlckNsaWVudCgpO1xuXG4gIGlmIChjb2RlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihjb2RlKTtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRTZXNzaW9uKCk7XG4gICAgICAgIGF3YWl0IGVuc3VyZVByb2ZpbGUoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIOustOyLnO2VmOqzoCDtmYjsnLzroZwg7J2064+ZXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChgJHtvcmlnaW59JHtuZXh0fWApO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlckNsaWVudCIsInRvU2x1ZyIsImlucHV0IiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZW5zdXJlUHJvZmlsZSIsInN1cGFiYXNlIiwiZGF0YSIsInVzZXIiLCJhdXRoIiwiZ2V0VXNlciIsImV4aXN0aW5nIiwiZnJvbSIsInNlbGVjdCIsImVxIiwiaWQiLCJtYXliZVNpbmdsZSIsIm1ldGFOaWNrbmFtZSIsInVzZXJfbWV0YWRhdGEiLCJuaWNrbmFtZSIsImZ1bGxOYW1lIiwiZnVsbF9uYW1lIiwiZW1haWxMb2NhbCIsImVtYWlsIiwic3BsaXQiLCJiYXNlIiwic2xpY2UiLCJjYW5kaWRhdGUiLCJpIiwiZXJyb3IiLCJpbnNlcnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJHRVQiLCJyZXEiLCJzZWFyY2hQYXJhbXMiLCJvcmlnaW4iLCJVUkwiLCJ1cmwiLCJjb2RlIiwiZ2V0IiwibmV4dCIsImV4Y2hhbmdlQ29kZUZvclNlc3Npb24iLCJnZXRTZXNzaW9uIiwicmVkaXJlY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/auth/callback/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase/server.ts":
/*!********************************!*\
  !*** ./lib/supabase/server.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getServerClient: () => (/* binding */ getServerClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function getServerClient() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const supabaseUrl = \"https://iarequheuudlmajvwtrt.supabase.co\";\n    const supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhcmVxdWhldXVkbG1hanZ3dHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MzYxNzAsImV4cCI6MjA3MDIxMjE3MH0.77LJGoJ-9Ujd5ssailzjZsKUs7NuJHAl5FvhMsAiSDM\";\n    if (!supabaseUrl || !supabaseKey) {\n        throw new Error(\"Supabase 환경변수가 설정되어 있지 않습니다. NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY\");\n    }\n    return (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_0__.createServerClient)(supabaseUrl, supabaseKey, {\n        cookies: {\n            get (name) {\n                return cookieStore.get(name)?.value;\n            },\n            set (name, value, options) {\n                cookieStore.set({\n                    name,\n                    value,\n                    ...options\n                });\n            },\n            remove (name, options) {\n                cookieStore.set({\n                    name,\n                    value: \"\",\n                    ...options\n                });\n            }\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2Uvc2VydmVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RTtBQUNoQztBQUVoQyxlQUFlRTtJQUNwQixNQUFNQyxjQUFjLE1BQU1GLHFEQUFPQTtJQUVqQyxNQUFNRyxjQUFjQywwQ0FBb0M7SUFDeEQsTUFBTUcsY0FBY0gsa05BQXlDO0lBRTdELElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxhQUFhO1FBQ2hDLE1BQU0sSUFBSUUsTUFDUjtJQUVKO0lBRUEsT0FBT1YsaUVBQWtCQSxDQUFDSSxhQUFhSSxhQUFhO1FBQ2xEUCxTQUFTO1lBQ1BVLEtBQUlDLElBQVk7Z0JBQ2QsT0FBT1QsWUFBWVEsR0FBRyxDQUFDQyxPQUFPQztZQUNoQztZQUNBQyxLQUFJRixJQUFZLEVBQUVDLEtBQWEsRUFBRUUsT0FBc0I7Z0JBQ3JEWixZQUFZVyxHQUFHLENBQUM7b0JBQUVGO29CQUFNQztvQkFBTyxHQUFHRSxPQUFPO2dCQUFDO1lBQzVDO1lBQ0FDLFFBQU9KLElBQVksRUFBRUcsT0FBc0I7Z0JBQ3pDWixZQUFZVyxHQUFHLENBQUM7b0JBQUVGO29CQUFNQyxPQUFPO29CQUFJLEdBQUdFLE9BQU87Z0JBQUM7WUFDaEQ7UUFDRjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGgvRG9jdW1lbnRzL0NvZGluZy9zanByb2plY3Qvd2VsbG5lc3MtYXBwL2xpYi9zdXBhYmFzZS9zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VydmVyQ2xpZW50LCB0eXBlIENvb2tpZU9wdGlvbnMgfSBmcm9tIFwiQHN1cGFiYXNlL3NzclwiO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlckNsaWVudCgpIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4gIGNvbnN0IHN1cGFiYXNlS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5cbiAgaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VLZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIlN1cGFiYXNlIO2ZmOqyveuzgOyImOqwgCDshKTsoJXrkJjslrQg7J6I7KeAIOyViuyKteuLiOuLpC4gTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIC8gTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVlcIlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlU2VydmVyQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwge1xuICAgIGNvb2tpZXM6IHtcbiAgICAgIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZVN0b3JlLmdldChuYW1lKT8udmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb3B0aW9uczogQ29va2llT3B0aW9ucykge1xuICAgICAgICBjb29raWVTdG9yZS5zZXQoeyBuYW1lLCB2YWx1ZSwgLi4ub3B0aW9ucyB9KTtcbiAgICAgIH0sXG4gICAgICByZW1vdmUobmFtZTogc3RyaW5nLCBvcHRpb25zOiBDb29raWVPcHRpb25zKSB7XG4gICAgICAgIGNvb2tpZVN0b3JlLnNldCh7IG5hbWUsIHZhbHVlOiBcIlwiLCAuLi5vcHRpb25zIH0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVTZXJ2ZXJDbGllbnQiLCJjb29raWVzIiwiZ2V0U2VydmVyQ2xpZW50IiwiY29va2llU3RvcmUiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUtleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiRXJyb3IiLCJnZXQiLCJuYW1lIiwidmFsdWUiLCJzZXQiLCJvcHRpb25zIiwicmVtb3ZlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase/server.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/@supabase/realtime-js/dist/module/lib sync recursive":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/ sync ***!
  \******************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/@supabase/realtime-js/dist/module/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fcallback%2Froute&page=%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fcallback%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fcallback%2Froute&page=%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fcallback%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_shh_Documents_Coding_sjproject_wellness_app_app_auth_callback_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/auth/callback/route.ts */ \"(rsc)/./app/auth/callback/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/auth/callback/route\",\n        pathname: \"/auth/callback\",\n        filename: \"route\",\n        bundlePath: \"app/auth/callback/route\"\n    },\n    resolvedPagePath: \"/Users/shh/Documents/Coding/sjproject/wellness-app/app/auth/callback/route.ts\",\n    nextConfigOutput,\n    userland: _Users_shh_Documents_Coding_sjproject_wellness_app_app_auth_callback_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhdXRoJTJGY2FsbGJhY2slMkZyb3V0ZSZwYWdlPSUyRmF1dGglMkZjYWxsYmFjayUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmF1dGglMkZjYWxsYmFjayUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNoaCUyRkRvY3VtZW50cyUyRkNvZGluZyUyRnNqcHJvamVjdCUyRndlbGxuZXNzLWFwcCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzaGglMkZEb2N1bWVudHMlMkZDb2RpbmclMkZzanByb2plY3QlMkZ3ZWxsbmVzcy1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc2hoL0RvY3VtZW50cy9Db2Rpbmcvc2pwcm9qZWN0L3dlbGxuZXNzLWFwcC9hcHAvYXV0aC9jYWxsYmFjay9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hdXRoL2NhbGxiYWNrL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hdXRoL2NhbGxiYWNrXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2F1dGgvY2FsbGJhY2svcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc2hoL0RvY3VtZW50cy9Db2Rpbmcvc2pwcm9qZWN0L3dlbGxuZXNzLWFwcC9hcHAvYXV0aC9jYWxsYmFjay9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fcallback%2Froute&page=%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fcallback%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/cookie","vendor-chunks/webidl-conversions","vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fcallback%2Froute&page=%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fcallback%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();