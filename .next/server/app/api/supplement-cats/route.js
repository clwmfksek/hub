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
exports.id = "app/api/supplement-cats/route";
exports.ids = ["app/api/supplement-cats/route"];
exports.modules = {

/***/ "(rsc)/./app/api/supplement-cats/route.ts":
/*!******************************************!*\
  !*** ./app/api/supplement-cats/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase/server */ \"(rsc)/./lib/supabase/server.ts\");\n\n\nasync function GET(req) {\n    try {\n        const url = new URL(req.url);\n        const names = url.searchParams.getAll(\"names\");\n        const supabase = await (0,_lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__.getServerClient)();\n        // 1) Build alias/canonical mapping per input name\n        const exactMap = {\n            \"Omega-3\": \"Omega-3 (EPA + DHA)\",\n            \"Vitamin D + K2\": [\n                \"Vitamin D3\",\n                \"Vitamin K2\"\n            ],\n            \"Vitamin D3 + K2\": [\n                \"Vitamin D3\",\n                \"Vitamin K2\"\n            ],\n            \"Metformin (Rx)\": \"Metformin\",\n            \"NMN or NR\": \"NMN\",\n            Magnesium: \"Magnesium (Glycinate or general)\"\n        };\n        // Manual categories for canonicals that may not exist in DB\n        const manualCategoryMap = {\n            Metformin: [\n                \"Metabolic & Weight\"\n            ]\n        };\n        function normalizeToken(token) {\n            const t = token.trim();\n            if (t === \"Vitamin D\") return \"Vitamin D3\";\n            if (t === \"K2\") return \"Vitamin K2\";\n            if (t === \"Omega 3\") return \"Omega-3 (EPA + DHA)\";\n            return t;\n        }\n        function toCanonicalList(name) {\n            // exact map first\n            const mapped = exactMap[name];\n            if (mapped) return Array.isArray(mapped) ? mapped : [\n                mapped\n            ];\n            // split by '+' (combinations) → map tokens\n            if (name.includes(\"+\")) {\n                const tokens = name.split(\"+\").map((s)=>normalizeToken(s));\n                return tokens;\n            }\n            // split by ' or ' (choose first canonical)\n            if (name.includes(\" or \")) {\n                const first = name.split(\" or \")[0];\n                return [\n                    normalizeToken(first)\n                ];\n            }\n            return [\n                name\n            ];\n        }\n        const originalToCanonical = {};\n        for (const n of names)originalToCanonical[n] = toCanonicalList(n);\n        const allCanonical = Array.from(new Set(Object.values(originalToCanonical).flat()));\n        // 2) Query unique canonical names only\n        let query = supabase.from(\"supplements\").select(\"name, supplement_categories(categories(name))\").order(\"name\");\n        if (allCanonical.length > 0) query = query.in(\"name\", allCanonical);\n        const { data, error } = await query;\n        if (error) throw error;\n        const byCanonical = {};\n        for (const row of data ?? []){\n            const cats = row.supplement_categories?.map((x)=>x.categories?.name)?.filter(Boolean);\n            byCanonical[row.name] = Array.isArray(cats) ? cats : [];\n        }\n        // fill from manualCategoryMap if missing or empty\n        for (const c of allCanonical){\n            if (!byCanonical[c] || byCanonical[c].length === 0) {\n                const manual = manualCategoryMap[c];\n                if (manual && manual.length > 0) byCanonical[c] = manual;\n            }\n        }\n        // 3) Build result keyed by ORIGINAL input names\n        const result = {};\n        for (const n of names){\n            const canon = originalToCanonical[n] ?? [\n                n\n            ];\n            const merged = Array.from(new Set(canon.flatMap((c)=>byCanonical[c] ?? [])));\n            result[n] = {\n                categories: merged,\n                primary: merged[0]\n            };\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (e) {\n        console.error(\"/api/supplement-cats error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: e?.message ?? \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N1cHBsZW1lbnQtY2F0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDYTtBQUVqRCxlQUFlRSxJQUFJQyxHQUFZO0lBQ3BDLElBQUk7UUFDRixNQUFNQyxNQUFNLElBQUlDLElBQUlGLElBQUlDLEdBQUc7UUFDM0IsTUFBTUUsUUFBUUYsSUFBSUcsWUFBWSxDQUFDQyxNQUFNLENBQUM7UUFDdEMsTUFBTUMsV0FBVyxNQUFNUixxRUFBZUE7UUFFdEMsa0RBQWtEO1FBQ2xELE1BQU1TLFdBQThDO1lBQ2xELFdBQVc7WUFDWCxrQkFBa0I7Z0JBQUM7Z0JBQWM7YUFBYTtZQUM5QyxtQkFBbUI7Z0JBQUM7Z0JBQWM7YUFBYTtZQUMvQyxrQkFBa0I7WUFDbEIsYUFBYTtZQUNiQyxXQUFXO1FBQ2I7UUFFQSw0REFBNEQ7UUFDNUQsTUFBTUMsb0JBQThDO1lBQ2xEQyxXQUFXO2dCQUFDO2FBQXFCO1FBQ25DO1FBRUEsU0FBU0MsZUFBZUMsS0FBYTtZQUNuQyxNQUFNQyxJQUFJRCxNQUFNRSxJQUFJO1lBQ3BCLElBQUlELE1BQU0sYUFBYSxPQUFPO1lBQzlCLElBQUlBLE1BQU0sTUFBTSxPQUFPO1lBQ3ZCLElBQUlBLE1BQU0sV0FBVyxPQUFPO1lBQzVCLE9BQU9BO1FBQ1Q7UUFFQSxTQUFTRSxnQkFBZ0JDLElBQVk7WUFDbkMsa0JBQWtCO1lBQ2xCLE1BQU1DLFNBQVNWLFFBQVEsQ0FBQ1MsS0FBSztZQUM3QixJQUFJQyxRQUFRLE9BQU9DLE1BQU1DLE9BQU8sQ0FBQ0YsVUFBVUEsU0FBUztnQkFBQ0E7YUFBTztZQUU1RCwyQ0FBMkM7WUFDM0MsSUFBSUQsS0FBS0ksUUFBUSxDQUFDLE1BQU07Z0JBQ3RCLE1BQU1DLFNBQVNMLEtBQUtNLEtBQUssQ0FBQyxLQUFLQyxHQUFHLENBQUMsQ0FBQ0MsSUFBTWIsZUFBZWE7Z0JBQ3pELE9BQU9IO1lBQ1Q7WUFFQSwyQ0FBMkM7WUFDM0MsSUFBSUwsS0FBS0ksUUFBUSxDQUFDLFNBQVM7Z0JBQ3pCLE1BQU1LLFFBQVFULEtBQUtNLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkMsT0FBTztvQkFBQ1gsZUFBZWM7aUJBQU87WUFDaEM7WUFFQSxPQUFPO2dCQUFDVDthQUFLO1FBQ2Y7UUFFQSxNQUFNVSxzQkFBZ0QsQ0FBQztRQUN2RCxLQUFLLE1BQU1DLEtBQUt4QixNQUFPdUIsbUJBQW1CLENBQUNDLEVBQUUsR0FBR1osZ0JBQWdCWTtRQUNoRSxNQUFNQyxlQUFlVixNQUFNVyxJQUFJLENBQzdCLElBQUlDLElBQUlDLE9BQU9DLE1BQU0sQ0FBQ04scUJBQXFCTyxJQUFJO1FBR2pELHVDQUF1QztRQUN2QyxJQUFJQyxRQUFRNUIsU0FDVHVCLElBQUksQ0FBQyxlQUNMTSxNQUFNLENBQUMsaURBQ1BDLEtBQUssQ0FBQztRQUNULElBQUlSLGFBQWFTLE1BQU0sR0FBRyxHQUFHSCxRQUFRQSxNQUFNSSxFQUFFLENBQUMsUUFBUVY7UUFFdEQsTUFBTSxFQUFFVyxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1OO1FBQzlCLElBQUlNLE9BQU8sTUFBTUE7UUFFakIsTUFBTUMsY0FBd0MsQ0FBQztRQUMvQyxLQUFLLE1BQU1DLE9BQU9ILFFBQVEsRUFBRSxDQUFFO1lBQzVCLE1BQU1JLE9BQU8sSUFBYUMscUJBQXFCLEVBQzNDckIsSUFBSSxDQUFDc0IsSUFBV0EsRUFBRUMsVUFBVSxFQUFFOUIsT0FDOUIrQixPQUFPQztZQUNYUCxXQUFXLENBQUMsSUFBYXpCLElBQUksQ0FBQyxHQUFHRSxNQUFNQyxPQUFPLENBQUN3QixRQUFRQSxPQUFPLEVBQUU7UUFDbEU7UUFFQSxrREFBa0Q7UUFDbEQsS0FBSyxNQUFNTSxLQUFLckIsYUFBYztZQUM1QixJQUFJLENBQUNhLFdBQVcsQ0FBQ1EsRUFBRSxJQUFJUixXQUFXLENBQUNRLEVBQUUsQ0FBQ1osTUFBTSxLQUFLLEdBQUc7Z0JBQ2xELE1BQU1hLFNBQVN6QyxpQkFBaUIsQ0FBQ3dDLEVBQUU7Z0JBQ25DLElBQUlDLFVBQVVBLE9BQU9iLE1BQU0sR0FBRyxHQUFHSSxXQUFXLENBQUNRLEVBQUUsR0FBR0M7WUFDcEQ7UUFDRjtRQUVBLGdEQUFnRDtRQUNoRCxNQUFNQyxTQUNKLENBQUM7UUFDSCxLQUFLLE1BQU14QixLQUFLeEIsTUFBTztZQUNyQixNQUFNaUQsUUFBUTFCLG1CQUFtQixDQUFDQyxFQUFFLElBQUk7Z0JBQUNBO2FBQUU7WUFDM0MsTUFBTTBCLFNBQVNuQyxNQUFNVyxJQUFJLENBQ3ZCLElBQUlDLElBQUlzQixNQUFNRSxPQUFPLENBQUMsQ0FBQ0wsSUFBTVIsV0FBVyxDQUFDUSxFQUFFLElBQUksRUFBRTtZQUVuREUsTUFBTSxDQUFDeEIsRUFBRSxHQUFHO2dCQUFFbUIsWUFBWU87Z0JBQVFFLFNBQVNGLE1BQU0sQ0FBQyxFQUFFO1lBQUM7UUFDdkQ7UUFFQSxPQUFPeEQscURBQVlBLENBQUMyRCxJQUFJLENBQUNMO0lBQzNCLEVBQUUsT0FBT00sR0FBUTtRQUNmQyxRQUFRbEIsS0FBSyxDQUFDLCtCQUErQmlCO1FBQzdDLE9BQU81RCxxREFBWUEsQ0FBQzJELElBQUksQ0FDdEI7WUFBRWhCLE9BQU9pQixHQUFHRSxXQUFXO1FBQWUsR0FDdEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGgvRG9jdW1lbnRzL0NvZGluZy9zanByb2plY3Qvd2VsbG5lc3MtYXBwL2FwcC9hcGkvc3VwcGxlbWVudC1jYXRzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZ2V0U2VydmVyQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XG4gICAgY29uc3QgbmFtZXMgPSB1cmwuc2VhcmNoUGFyYW1zLmdldEFsbChcIm5hbWVzXCIpO1xuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgZ2V0U2VydmVyQ2xpZW50KCk7XG5cbiAgICAvLyAxKSBCdWlsZCBhbGlhcy9jYW5vbmljYWwgbWFwcGluZyBwZXIgaW5wdXQgbmFtZVxuICAgIGNvbnN0IGV4YWN0TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4gPSB7XG4gICAgICBcIk9tZWdhLTNcIjogXCJPbWVnYS0zIChFUEEgKyBESEEpXCIsXG4gICAgICBcIlZpdGFtaW4gRCArIEsyXCI6IFtcIlZpdGFtaW4gRDNcIiwgXCJWaXRhbWluIEsyXCJdLFxuICAgICAgXCJWaXRhbWluIEQzICsgSzJcIjogW1wiVml0YW1pbiBEM1wiLCBcIlZpdGFtaW4gSzJcIl0sXG4gICAgICBcIk1ldGZvcm1pbiAoUngpXCI6IFwiTWV0Zm9ybWluXCIsXG4gICAgICBcIk5NTiBvciBOUlwiOiBcIk5NTlwiLFxuICAgICAgTWFnbmVzaXVtOiBcIk1hZ25lc2l1bSAoR2x5Y2luYXRlIG9yIGdlbmVyYWwpXCIsXG4gICAgfTtcblxuICAgIC8vIE1hbnVhbCBjYXRlZ29yaWVzIGZvciBjYW5vbmljYWxzIHRoYXQgbWF5IG5vdCBleGlzdCBpbiBEQlxuICAgIGNvbnN0IG1hbnVhbENhdGVnb3J5TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7XG4gICAgICBNZXRmb3JtaW46IFtcIk1ldGFib2xpYyAmIFdlaWdodFwiXSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVG9rZW4odG9rZW46IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICBjb25zdCB0ID0gdG9rZW4udHJpbSgpO1xuICAgICAgaWYgKHQgPT09IFwiVml0YW1pbiBEXCIpIHJldHVybiBcIlZpdGFtaW4gRDNcIjtcbiAgICAgIGlmICh0ID09PSBcIksyXCIpIHJldHVybiBcIlZpdGFtaW4gSzJcIjtcbiAgICAgIGlmICh0ID09PSBcIk9tZWdhIDNcIikgcmV0dXJuIFwiT21lZ2EtMyAoRVBBICsgREhBKVwiO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9DYW5vbmljYWxMaXN0KG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgIC8vIGV4YWN0IG1hcCBmaXJzdFxuICAgICAgY29uc3QgbWFwcGVkID0gZXhhY3RNYXBbbmFtZV07XG4gICAgICBpZiAobWFwcGVkKSByZXR1cm4gQXJyYXkuaXNBcnJheShtYXBwZWQpID8gbWFwcGVkIDogW21hcHBlZF07XG5cbiAgICAgIC8vIHNwbGl0IGJ5ICcrJyAoY29tYmluYXRpb25zKSDihpIgbWFwIHRva2Vuc1xuICAgICAgaWYgKG5hbWUuaW5jbHVkZXMoXCIrXCIpKSB7XG4gICAgICAgIGNvbnN0IHRva2VucyA9IG5hbWUuc3BsaXQoXCIrXCIpLm1hcCgocykgPT4gbm9ybWFsaXplVG9rZW4ocykpO1xuICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgfVxuXG4gICAgICAvLyBzcGxpdCBieSAnIG9yICcgKGNob29zZSBmaXJzdCBjYW5vbmljYWwpXG4gICAgICBpZiAobmFtZS5pbmNsdWRlcyhcIiBvciBcIikpIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSBuYW1lLnNwbGl0KFwiIG9yIFwiKVswXTtcbiAgICAgICAgcmV0dXJuIFtub3JtYWxpemVUb2tlbihmaXJzdCldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW25hbWVdO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsVG9DYW5vbmljYWw6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuICAgIGZvciAoY29uc3QgbiBvZiBuYW1lcykgb3JpZ2luYWxUb0Nhbm9uaWNhbFtuXSA9IHRvQ2Fub25pY2FsTGlzdChuKTtcbiAgICBjb25zdCBhbGxDYW5vbmljYWwgPSBBcnJheS5mcm9tKFxuICAgICAgbmV3IFNldChPYmplY3QudmFsdWVzKG9yaWdpbmFsVG9DYW5vbmljYWwpLmZsYXQoKSlcbiAgICApO1xuXG4gICAgLy8gMikgUXVlcnkgdW5pcXVlIGNhbm9uaWNhbCBuYW1lcyBvbmx5XG4gICAgbGV0IHF1ZXJ5ID0gc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwic3VwcGxlbWVudHNcIilcbiAgICAgIC5zZWxlY3QoXCJuYW1lLCBzdXBwbGVtZW50X2NhdGVnb3JpZXMoY2F0ZWdvcmllcyhuYW1lKSlcIilcbiAgICAgIC5vcmRlcihcIm5hbWVcIik7XG4gICAgaWYgKGFsbENhbm9uaWNhbC5sZW5ndGggPiAwKSBxdWVyeSA9IHF1ZXJ5LmluKFwibmFtZVwiLCBhbGxDYW5vbmljYWwpO1xuXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgcXVlcnk7XG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblxuICAgIGNvbnN0IGJ5Q2Fub25pY2FsOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiBkYXRhID8/IFtdKSB7XG4gICAgICBjb25zdCBjYXRzID0gKHJvdyBhcyBhbnkpLnN1cHBsZW1lbnRfY2F0ZWdvcmllc1xuICAgICAgICA/Lm1hcCgoeDogYW55KSA9PiB4LmNhdGVnb3JpZXM/Lm5hbWUpXG4gICAgICAgID8uZmlsdGVyKEJvb2xlYW4pIGFzIHN0cmluZ1tdO1xuICAgICAgYnlDYW5vbmljYWxbKHJvdyBhcyBhbnkpLm5hbWVdID0gQXJyYXkuaXNBcnJheShjYXRzKSA/IGNhdHMgOiBbXTtcbiAgICB9XG5cbiAgICAvLyBmaWxsIGZyb20gbWFudWFsQ2F0ZWdvcnlNYXAgaWYgbWlzc2luZyBvciBlbXB0eVxuICAgIGZvciAoY29uc3QgYyBvZiBhbGxDYW5vbmljYWwpIHtcbiAgICAgIGlmICghYnlDYW5vbmljYWxbY10gfHwgYnlDYW5vbmljYWxbY10ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IG1hbnVhbCA9IG1hbnVhbENhdGVnb3J5TWFwW2NdO1xuICAgICAgICBpZiAobWFudWFsICYmIG1hbnVhbC5sZW5ndGggPiAwKSBieUNhbm9uaWNhbFtjXSA9IG1hbnVhbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAzKSBCdWlsZCByZXN1bHQga2V5ZWQgYnkgT1JJR0lOQUwgaW5wdXQgbmFtZXNcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHsgY2F0ZWdvcmllczogc3RyaW5nW107IHByaW1hcnk/OiBzdHJpbmcgfT4gPVxuICAgICAge307XG4gICAgZm9yIChjb25zdCBuIG9mIG5hbWVzKSB7XG4gICAgICBjb25zdCBjYW5vbiA9IG9yaWdpbmFsVG9DYW5vbmljYWxbbl0gPz8gW25dO1xuICAgICAgY29uc3QgbWVyZ2VkID0gQXJyYXkuZnJvbShcbiAgICAgICAgbmV3IFNldChjYW5vbi5mbGF0TWFwKChjKSA9PiBieUNhbm9uaWNhbFtjXSA/PyBbXSkpXG4gICAgICApO1xuICAgICAgcmVzdWx0W25dID0geyBjYXRlZ29yaWVzOiBtZXJnZWQsIHByaW1hcnk6IG1lcmdlZFswXSB9O1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHQpO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiL2FwaS9zdXBwbGVtZW50LWNhdHMgZXJyb3I6XCIsIGUpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGU/Lm1lc3NhZ2UgPz8gXCJTZXJ2ZXIgZXJyb3JcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlckNsaWVudCIsIkdFVCIsInJlcSIsInVybCIsIlVSTCIsIm5hbWVzIiwic2VhcmNoUGFyYW1zIiwiZ2V0QWxsIiwic3VwYWJhc2UiLCJleGFjdE1hcCIsIk1hZ25lc2l1bSIsIm1hbnVhbENhdGVnb3J5TWFwIiwiTWV0Zm9ybWluIiwibm9ybWFsaXplVG9rZW4iLCJ0b2tlbiIsInQiLCJ0cmltIiwidG9DYW5vbmljYWxMaXN0IiwibmFtZSIsIm1hcHBlZCIsIkFycmF5IiwiaXNBcnJheSIsImluY2x1ZGVzIiwidG9rZW5zIiwic3BsaXQiLCJtYXAiLCJzIiwiZmlyc3QiLCJvcmlnaW5hbFRvQ2Fub25pY2FsIiwibiIsImFsbENhbm9uaWNhbCIsImZyb20iLCJTZXQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmbGF0IiwicXVlcnkiLCJzZWxlY3QiLCJvcmRlciIsImxlbmd0aCIsImluIiwiZGF0YSIsImVycm9yIiwiYnlDYW5vbmljYWwiLCJyb3ciLCJjYXRzIiwic3VwcGxlbWVudF9jYXRlZ29yaWVzIiwieCIsImNhdGVnb3JpZXMiLCJmaWx0ZXIiLCJCb29sZWFuIiwiYyIsIm1hbnVhbCIsInJlc3VsdCIsImNhbm9uIiwibWVyZ2VkIiwiZmxhdE1hcCIsInByaW1hcnkiLCJqc29uIiwiZSIsImNvbnNvbGUiLCJtZXNzYWdlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/supplement-cats/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase/server.ts":
/*!********************************!*\
  !*** ./lib/supabase/server.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getServerClient: () => (/* binding */ getServerClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function getServerClient() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const supabaseUrl = \"https://iarequheuudlmajvwtrt.supabase.co\";\n    const supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhcmVxdWhldXVkbG1hanZ3dHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MzYxNzAsImV4cCI6MjA3MDIxMjE3MH0.77LJGoJ-9Ujd5ssailzjZsKUs7NuJHAl5FvhMsAiSDM\";\n    if (!supabaseUrl || !supabaseKey) {\n        throw new Error(\"Supabase environment variables are missing. NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY\");\n    }\n    return (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_0__.createServerClient)(supabaseUrl, supabaseKey, {\n        cookies: {\n            get (name) {\n                return cookieStore.get(name)?.value;\n            },\n            set (name, value, options) {\n                cookieStore.set({\n                    name,\n                    value,\n                    ...options\n                });\n            },\n            remove (name, options) {\n                cookieStore.set({\n                    name,\n                    value: \"\",\n                    ...options\n                });\n            }\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2Uvc2VydmVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RTtBQUNoQztBQUVoQyxlQUFlRTtJQUNwQixNQUFNQyxjQUFjLE1BQU1GLHFEQUFPQTtJQUVqQyxNQUFNRyxjQUFjQywwQ0FBb0M7SUFDeEQsTUFBTUcsY0FBY0gsa05BQXlDO0lBRTdELElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxhQUFhO1FBQ2hDLE1BQU0sSUFBSUUsTUFDUjtJQUVKO0lBRUEsT0FBT1YsaUVBQWtCQSxDQUFDSSxhQUFhSSxhQUFhO1FBQ2xEUCxTQUFTO1lBQ1BVLEtBQUlDLElBQVk7Z0JBQ2QsT0FBT1QsWUFBWVEsR0FBRyxDQUFDQyxPQUFPQztZQUNoQztZQUNBQyxLQUFJRixJQUFZLEVBQUVDLEtBQWEsRUFBRUUsT0FBc0I7Z0JBQ3JEWixZQUFZVyxHQUFHLENBQUM7b0JBQUVGO29CQUFNQztvQkFBTyxHQUFHRSxPQUFPO2dCQUFDO1lBQzVDO1lBQ0FDLFFBQU9KLElBQVksRUFBRUcsT0FBc0I7Z0JBQ3pDWixZQUFZVyxHQUFHLENBQUM7b0JBQUVGO29CQUFNQyxPQUFPO29CQUFJLEdBQUdFLE9BQU87Z0JBQUM7WUFDaEQ7UUFDRjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGgvRG9jdW1lbnRzL0NvZGluZy9zanByb2plY3Qvd2VsbG5lc3MtYXBwL2xpYi9zdXBhYmFzZS9zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VydmVyQ2xpZW50LCB0eXBlIENvb2tpZU9wdGlvbnMgfSBmcm9tIFwiQHN1cGFiYXNlL3NzclwiO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlckNsaWVudCgpIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKCk7XG5cbiAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4gIGNvbnN0IHN1cGFiYXNlS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5cbiAgaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VLZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIlN1cGFiYXNlIGVudmlyb25tZW50IHZhcmlhYmxlcyBhcmUgbWlzc2luZy4gTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIC8gTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVlcIlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlU2VydmVyQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwge1xuICAgIGNvb2tpZXM6IHtcbiAgICAgIGdldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZVN0b3JlLmdldChuYW1lKT8udmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb3B0aW9uczogQ29va2llT3B0aW9ucykge1xuICAgICAgICBjb29raWVTdG9yZS5zZXQoeyBuYW1lLCB2YWx1ZSwgLi4ub3B0aW9ucyB9KTtcbiAgICAgIH0sXG4gICAgICByZW1vdmUobmFtZTogc3RyaW5nLCBvcHRpb25zOiBDb29raWVPcHRpb25zKSB7XG4gICAgICAgIGNvb2tpZVN0b3JlLnNldCh7IG5hbWUsIHZhbHVlOiBcIlwiLCAuLi5vcHRpb25zIH0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVTZXJ2ZXJDbGllbnQiLCJjb29raWVzIiwiZ2V0U2VydmVyQ2xpZW50IiwiY29va2llU3RvcmUiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUtleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiRXJyb3IiLCJnZXQiLCJuYW1lIiwidmFsdWUiLCJzZXQiLCJvcHRpb25zIiwicmVtb3ZlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase/server.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsupplement-cats%2Froute&page=%2Fapi%2Fsupplement-cats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsupplement-cats%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsupplement-cats%2Froute&page=%2Fapi%2Fsupplement-cats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsupplement-cats%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_shh_Documents_Coding_sjproject_wellness_app_app_api_supplement_cats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/supplement-cats/route.ts */ \"(rsc)/./app/api/supplement-cats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/supplement-cats/route\",\n        pathname: \"/api/supplement-cats\",\n        filename: \"route\",\n        bundlePath: \"app/api/supplement-cats/route\"\n    },\n    resolvedPagePath: \"/Users/shh/Documents/Coding/sjproject/wellness-app/app/api/supplement-cats/route.ts\",\n    nextConfigOutput,\n    userland: _Users_shh_Documents_Coding_sjproject_wellness_app_app_api_supplement_cats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdXBwbGVtZW50LWNhdHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN1cHBsZW1lbnQtY2F0cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN1cHBsZW1lbnQtY2F0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNoaCUyRkRvY3VtZW50cyUyRkNvZGluZyUyRnNqcHJvamVjdCUyRndlbGxuZXNzLWFwcCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzaGglMkZEb2N1bWVudHMlMkZDb2RpbmclMkZzanByb2plY3QlMkZ3ZWxsbmVzcy1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ21DO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc2hoL0RvY3VtZW50cy9Db2Rpbmcvc2pwcm9qZWN0L3dlbGxuZXNzLWFwcC9hcHAvYXBpL3N1cHBsZW1lbnQtY2F0cy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3VwcGxlbWVudC1jYXRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3VwcGxlbWVudC1jYXRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zdXBwbGVtZW50LWNhdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc2hoL0RvY3VtZW50cy9Db2Rpbmcvc2pwcm9qZWN0L3dlbGxuZXNzLWFwcC9hcHAvYXBpL3N1cHBsZW1lbnQtY2F0cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsupplement-cats%2Froute&page=%2Fapi%2Fsupplement-cats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsupplement-cats%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/cookie","vendor-chunks/webidl-conversions","vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsupplement-cats%2Froute&page=%2Fapi%2Fsupplement-cats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsupplement-cats%2Froute.ts&appDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshh%2FDocuments%2FCoding%2Fsjproject%2Fwellness-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();