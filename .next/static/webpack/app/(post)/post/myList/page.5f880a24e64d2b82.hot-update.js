"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(post)/post/myList/page",{

/***/ "(app-pages-browser)/./app/(post)/post/myList/page.jsx":
/*!*****************************************!*\
  !*** ./app/(post)/post/myList/page.jsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ myList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _util_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/AuthContext */ \"(app-pages-browser)/./app/util/AuthContext.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction myList() {\n    _s();\n    const { user } = (0,_util_AuthContext__WEBPACK_IMPORTED_MODULE_2__.useAuth)();\n    const userId = user && user.body[0].id;\n    const [blogPosts, setBlogPosts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // 페이징 번호\n    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // 데이터 로딩 상태\n    const [hasNextPage, setHasNextPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // 다음 페이지 여부 (마지막 페이지 알림)\n    // 스크롤 위치를 저장하기 위한 ref\n    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const myBlogPost = async (page)=>{\n            try {\n                setLoading(true); // 데이터 로딩 중\n                const res = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/api/post/myList\", {\n                    params: {\n                        userId,\n                        page\n                    }\n                });\n                console.log(\"resssss \" + JSON.stringify(res));\n                if (res.status === 200) {\n                    console.log(\"성공!!!\");\n                    console.log(\"res.data.body = \" + JSON.stringify(res.data.body));\n                    // setBlogPosts(res.data.body); // 블로그 포스트 데이터를 상태에 저장\n                    setBlogPosts((prevPosts)=>[\n                            ...prevPosts,\n                            ...res.data.body.posts\n                        ]);\n                    setHasNextPage(res.data.body.hasNextPage); // 다음 페이지 여부 업데이트\n                }\n            } catch (error) {\n                if (error.response && error.response.status === 404) {\n                    // 404 오류일 경우, '등록된 게시글이 없습니다' 메시지를 띄우고 페이징 종료\n                    setHasNextPage(false);\n                    if (blogPosts.length === 0) {\n                        alert(error.response.data.msg);\n                    }\n                } else {\n                    alert(\"오류가 발생했습니다.\");\n                }\n            } finally{\n                setLoading(false); // 데이터 로딩 종료\n            }\n        };\n        // 다음 페이지가 있을 때만 요청!\n        if (userId && hasNextPage) {\n            myBlogPost(page);\n        }\n    }, [\n        userId,\n        page,\n        hasNextPage\n    ]);\n    // 스크롤 페이징\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleScroll = ()=>{\n            const scrollTop = window.scrollY || document.documentElement.scrollTop;\n            const windowHeight = window.innerHeight;\n            const documentHeight = document.documentElement.scrollHeight;\n            const scrollPercentage = scrollTop / (documentHeight - windowHeight) * 100;\n            if (scrollPercentage >= 80 && !loading && hasNextPage) {\n                setPage((prevPage)=>prevPage + 1); // 다음 페이지로 이동\n            }\n        };\n        window.addEventListener(\"scroll\", handleScroll);\n        return ()=>{\n            window.removeEventListener(\"scroll\", handleScroll);\n        };\n    }, [\n        loading,\n        hasNextPage\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!hasNextPage && !loading && blogPosts.length > 0) {\n            alert(\"마지막 페이지입니다!\");\n        }\n    }, [\n        hasNextPage,\n        loading\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"max-w-4xl mx-auto py-10\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-4xl font-bold mb-10\",\n                children: \"cos's Blog\"\n            }, void 0, false, {\n                fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, this),\n            blogPosts.map((post, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-row mb-8 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-center\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                src: \"/img/\".concat(post.thumbnail_file),\n                                alt: post.thumbnail_file,\n                                width: 350,\n                                height: 200\n                            }, void 0, false, {\n                                fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                                lineNumber: 97,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                            lineNumber: 96,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            href: \"/post/\".concat(post.id),\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"p-6\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                        className: \"text-2xl font-bold mb-2\",\n                                        children: post.title\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                                        lineNumber: 107,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-gray-600 mb-4\",\n                                        children: [\n                                            post.date,\n                                            \" (10:08)\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                                        lineNumber: 108,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-gray-800 mb-4\",\n                                        children: post.content\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                                        lineNumber: 109,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                                lineNumber: 106,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                            lineNumber: 105,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, \"\".concat(post.id, \"-\").concat(index), true, {\n                    fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                    lineNumber: 92,\n                    columnNumber: 9\n                }, this)),\n            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n                lineNumber: 114,\n                columnNumber: 19\n            }, this),\n            \" \"\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\workspace\\\\nextJS-blog-test 222\\\\app\\\\(post)\\\\post\\\\myList\\\\page.jsx\",\n        lineNumber: 88,\n        columnNumber: 5\n    }, this);\n}\n_s(myList, \"nNfAnbRetIKgBgjsLsU1AspHD6E=\", false, function() {\n    return [\n        _util_AuthContext__WEBPACK_IMPORTED_MODULE_2__.useAuth\n    ];\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC8ocG9zdCkvcG9zdC9teUxpc3QvcGFnZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRW9EO0FBQ0E7QUFDMUI7QUFDRztBQUVkLFNBQVNNOztJQUN0QixNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHSiwwREFBT0E7SUFDeEIsTUFBTUssU0FBU0QsUUFBUUEsS0FBS0UsSUFBSSxDQUFDLEVBQUUsQ0FBQ0MsRUFBRTtJQUN0QyxNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR1YsK0NBQVFBLENBQUMsRUFBRTtJQUU3QyxTQUFTO0lBQ1QsTUFBTSxDQUFDVyxNQUFNQyxRQUFRLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ2EsU0FBU0MsV0FBVyxHQUFHZCwrQ0FBUUEsQ0FBQyxRQUFRLFlBQVk7SUFDM0QsTUFBTSxDQUFDZSxhQUFhQyxlQUFlLEdBQUdoQiwrQ0FBUUEsQ0FBQyxPQUFPLHlCQUF5QjtJQUUvRSxzQkFBc0I7SUFDdEIsTUFBTWlCLFlBQVlsQiw2Q0FBTUEsQ0FBQztJQUV6QkQsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0IsYUFBYSxPQUFPUDtZQUN4QixJQUFJO2dCQUNGRyxXQUFXLE9BQU8sV0FBVztnQkFDN0IsTUFBTUssTUFBTSxNQUFNakIsNkNBQUtBLENBQUNrQixHQUFHLENBQUUsb0JBQW1CO29CQUM5Q0MsUUFBUTt3QkFBRWY7d0JBQVFLO29CQUFLO2dCQUN6QjtnQkFFQVcsUUFBUUMsR0FBRyxDQUFDLGFBQWFDLEtBQUtDLFNBQVMsQ0FBQ047Z0JBRXhDLElBQUlBLElBQUlPLE1BQU0sS0FBSyxLQUFLO29CQUN0QkosUUFBUUMsR0FBRyxDQUFDO29CQUNaRCxRQUFRQyxHQUFHLENBQUMscUJBQXFCQyxLQUFLQyxTQUFTLENBQUNOLElBQUlRLElBQUksQ0FBQ3BCLElBQUk7b0JBQzdELHNEQUFzRDtvQkFDdERHLGFBQWEsQ0FBQ2tCLFlBQWM7K0JBQUlBOytCQUFjVCxJQUFJUSxJQUFJLENBQUNwQixJQUFJLENBQUNzQixLQUFLO3lCQUFDO29CQUNsRWIsZUFBZUcsSUFBSVEsSUFBSSxDQUFDcEIsSUFBSSxDQUFDUSxXQUFXLEdBQUcsaUJBQWlCO2dCQUM5RDtZQUNGLEVBQUUsT0FBT2UsT0FBTztnQkFDZCxJQUFJQSxNQUFNQyxRQUFRLElBQUlELE1BQU1DLFFBQVEsQ0FBQ0wsTUFBTSxLQUFLLEtBQUs7b0JBQ25ELDhDQUE4QztvQkFDOUNWLGVBQWU7b0JBQ2YsSUFBSVAsVUFBVXVCLE1BQU0sS0FBSyxHQUFHO3dCQUMxQkMsTUFBTUgsTUFBTUMsUUFBUSxDQUFDSixJQUFJLENBQUNPLEdBQUc7b0JBQy9CO2dCQUNGLE9BQU87b0JBQ0xELE1BQU07Z0JBQ1I7WUFDRixTQUFVO2dCQUNSbkIsV0FBVyxRQUFRLFlBQVk7WUFDakM7UUFDRjtRQUVBLG9CQUFvQjtRQUNwQixJQUFJUixVQUFVUyxhQUFhO1lBQ3pCRyxXQUFXUDtRQUNiO0lBQ0YsR0FBRztRQUFDTDtRQUFRSztRQUFNSTtLQUFZO0lBRTlCLFVBQVU7SUFDVmpCLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTXFDLGVBQWU7WUFDbkIsTUFBTUMsWUFBWUMsT0FBT0MsT0FBTyxJQUFJQyxTQUFTQyxlQUFlLENBQUNKLFNBQVM7WUFDdEUsTUFBTUssZUFBZUosT0FBT0ssV0FBVztZQUN2QyxNQUFNQyxpQkFBaUJKLFNBQVNDLGVBQWUsQ0FBQ0ksWUFBWTtZQUU1RCxNQUFNQyxtQkFDSixZQUFjRixDQUFBQSxpQkFBaUJGLFlBQVcsSUFBTTtZQUVsRCxJQUFJSSxvQkFBb0IsTUFBTSxDQUFDaEMsV0FBV0UsYUFBYTtnQkFDckRILFFBQVEsQ0FBQ2tDLFdBQWFBLFdBQVcsSUFBSSxhQUFhO1lBQ3BEO1FBQ0Y7UUFFQVQsT0FBT1UsZ0JBQWdCLENBQUMsVUFBVVo7UUFFbEMsT0FBTztZQUNMRSxPQUFPVyxtQkFBbUIsQ0FBQyxVQUFVYjtRQUN2QztJQUNGLEdBQUc7UUFBQ3RCO1FBQVNFO0tBQVk7SUFFekJqQixnREFBU0EsQ0FBQztRQUNSLElBQUksQ0FBQ2lCLGVBQWUsQ0FBQ0YsV0FBV0osVUFBVXVCLE1BQU0sR0FBRyxHQUFHO1lBQ3BEQyxNQUFNO1FBQ1I7SUFDRixHQUFHO1FBQUNsQjtRQUFhRjtLQUFRO0lBRXpCLHFCQUNFLDhEQUFDb0M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFHRCxXQUFVOzBCQUEyQjs7Ozs7O1lBRXhDekMsVUFBVTJDLEdBQUcsQ0FBQyxDQUFDQyxNQUFNQyxzQkFDcEIsOERBQUNMO29CQUNDQyxXQUFVOztzQ0FHViw4REFBQ0Q7NEJBQUlDLFdBQVU7c0NBQ2IsNEVBQUNLO2dDQUNDQyxLQUFLLFFBQTRCLE9BQXBCSCxLQUFLSSxjQUFjO2dDQUNoQ0MsS0FBS0wsS0FBS0ksY0FBYztnQ0FDeEJFLE9BQU87Z0NBQ1BDLFFBQVE7Ozs7Ozs7Ozs7O3NDQUlaLDhEQUFDekQsaURBQUlBOzRCQUFDMEQsTUFBTSxTQUFpQixPQUFSUixLQUFLN0MsRUFBRTtzQ0FDMUIsNEVBQUN5QztnQ0FBSUMsV0FBVTs7a0RBQ2IsOERBQUNZO3dDQUFHWixXQUFVO2tEQUEyQkcsS0FBS1UsS0FBSzs7Ozs7O2tEQUNuRCw4REFBQ0M7d0NBQUVkLFdBQVU7OzRDQUFzQkcsS0FBS1ksSUFBSTs0Q0FBQzs7Ozs7OztrREFDN0MsOERBQUNEO3dDQUFFZCxXQUFVO2tEQUFzQkcsS0FBS2EsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQWY5QyxHQUFjWixPQUFYRCxLQUFLN0MsRUFBRSxFQUFDLEtBQVMsT0FBTjhDOzs7OztZQW9CdEJ6Qyx5QkFBVyw4REFBQ21EOzBCQUFFOzs7Ozs7WUFBZTs7Ozs7OztBQUdwQztHQTdHd0I1RDs7UUFDTEgsc0RBQU9BIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC8ocG9zdCkvcG9zdC9teUxpc3QvcGFnZS5qc3g/YWRkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWwvQXV0aENvbnRleHRcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBteUxpc3QoKSB7XHJcbiAgY29uc3QgeyB1c2VyIH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3QgdXNlcklkID0gdXNlciAmJiB1c2VyLmJvZHlbMF0uaWQ7XHJcbiAgY29uc3QgW2Jsb2dQb3N0cywgc2V0QmxvZ1Bvc3RzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgLy8g7Y6Y7J207KeVIOuyiO2YuFxyXG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTsgLy8g642w7J207YSwIOuhnOuUqSDsg4Htg5xcclxuICBjb25zdCBbaGFzTmV4dFBhZ2UsIHNldEhhc05leHRQYWdlXSA9IHVzZVN0YXRlKHRydWUpOyAvLyDri6TsnYwg7Y6Y7J207KeAIOyXrOu2gCAo66eI7KeA66eJIO2OmOydtOyngCDslYzrprwpXHJcblxyXG4gIC8vIOyKpO2BrOuhpCDsnITsuZjrpbwg7KCA7J6l7ZWY6riwIOychO2VnCByZWZcclxuICBjb25zdCBzY3JvbGxSZWYgPSB1c2VSZWYoMCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBteUJsb2dQb3N0ID0gYXN5bmMgKHBhZ2UpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpOyAvLyDrjbDsnbTthLAg66Gc65SpIOykkVxyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgL2FwaS9wb3N0L215TGlzdGAsIHtcclxuICAgICAgICAgIHBhcmFtczogeyB1c2VySWQsIHBhZ2UgfSwgLy8g7L+866asIO2MjOudvOuvuO2EsOuhnCB1c2VySWQg7KCE64usICjtjpjsnbTsp5Ug7ZWg6rGw64uI6rmMIHBhZ2Xrj4Qg7KCE64usLiAvYXBpL3Bvc3QvbXlMaXN0P3VzZXJJZD0xP3BhZ2U9MSDsnbTrn7Ag7ZiV7IudKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3Nzc3MgXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLshLHqs7UhISFcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcy5kYXRhLmJvZHkgPSBcIiArIEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhLmJvZHkpKTtcclxuICAgICAgICAgIC8vIHNldEJsb2dQb3N0cyhyZXMuZGF0YS5ib2R5KTsgLy8g67iU66Gc6re4IO2PrOyKpO2KuCDrjbDsnbTthLDrpbwg7IOB7YOc7JeQIOyggOyepVxyXG4gICAgICAgICAgc2V0QmxvZ1Bvc3RzKChwcmV2UG9zdHMpID0+IFsuLi5wcmV2UG9zdHMsIC4uLnJlcy5kYXRhLmJvZHkucG9zdHNdKTtcclxuICAgICAgICAgIHNldEhhc05leHRQYWdlKHJlcy5kYXRhLmJvZHkuaGFzTmV4dFBhZ2UpOyAvLyDri6TsnYwg7Y6Y7J207KeAIOyXrOu2gCDsl4XrjbDsnbTtirhcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlICYmIGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAvLyA0MDQg7Jik66WY7J28IOqyveyasCwgJ+uTseuhneuQnCDqsozsi5zquIDsnbQg7JeG7Iq164uI64ukJyDrqZTsi5zsp4Drpbwg652E7Jqw6rOgIO2OmOydtOynlSDsooXro4xcclxuICAgICAgICAgIHNldEhhc05leHRQYWdlKGZhbHNlKTtcclxuICAgICAgICAgIGlmIChibG9nUG9zdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yLnJlc3BvbnNlLmRhdGEubXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLsmKTrpZjqsIAg67Cc7IOd7ZaI7Iq164uI64ukLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7IC8vIOuNsOydtO2EsCDroZzrlKkg7KKF66OMXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g64uk7J2MIO2OmOydtOyngOqwgCDsnojsnYQg65WM66eMIOyalOyyrSFcclxuICAgIGlmICh1c2VySWQgJiYgaGFzTmV4dFBhZ2UpIHtcclxuICAgICAgbXlCbG9nUG9zdChwYWdlKTtcclxuICAgIH1cclxuICB9LCBbdXNlcklkLCBwYWdlLCBoYXNOZXh0UGFnZV0pO1xyXG5cclxuICAvLyDsiqTtgazroaQg7Y6Y7J207KeVXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZVNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICBjb25zdCBkb2N1bWVudEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICBjb25zdCBzY3JvbGxQZXJjZW50YWdlID1cclxuICAgICAgICAoc2Nyb2xsVG9wIC8gKGRvY3VtZW50SGVpZ2h0IC0gd2luZG93SGVpZ2h0KSkgKiAxMDA7XHJcblxyXG4gICAgICBpZiAoc2Nyb2xsUGVyY2VudGFnZSA+PSA4MCAmJiAhbG9hZGluZyAmJiBoYXNOZXh0UGFnZSkge1xyXG4gICAgICAgIHNldFBhZ2UoKHByZXZQYWdlKSA9PiBwcmV2UGFnZSArIDEpOyAvLyDri6TsnYwg7Y6Y7J207KeA66GcIOydtOuPmVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsKTtcclxuICAgIH07XHJcbiAgfSwgW2xvYWRpbmcsIGhhc05leHRQYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc05leHRQYWdlICYmICFsb2FkaW5nICYmIGJsb2dQb3N0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGFsZXJ0KFwi66eI7KeA66eJIO2OmOydtOyngOyeheuLiOuLpCFcIik7XHJcbiAgICB9XHJcbiAgfSwgW2hhc05leHRQYWdlLCBsb2FkaW5nXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTR4bCBteC1hdXRvIHB5LTEwXCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgbWItMTBcIj5jb3MncyBCbG9nPC9oMT5cclxuICAgICAgey8qIOqwgSDtj6zsiqTtirjrpbwg67CY67O17ZWY7JesIOugjOuNlOungSAqL31cclxuICAgICAge2Jsb2dQb3N0cy5tYXAoKHBvc3QsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBtYi04IGJvcmRlciByb3VuZGVkLWxnIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctbGcgdHJhbnNmb3JtIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMDUgaG92ZXI6Y3Vyc29yLXBvaW50ZXJcIlxyXG4gICAgICAgICAga2V5PXtgJHtwb3N0LmlkfS0ke2luZGV4fWB9IC8vIOqzoOycoO2VnCBrZXkg7IaN7ISxIOy2lOqwgFxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgc3JjPXtgL2ltZy8ke3Bvc3QudGh1bWJuYWlsX2ZpbGV9YH1cclxuICAgICAgICAgICAgICBhbHQ9e3Bvc3QudGh1bWJuYWlsX2ZpbGV9XHJcbiAgICAgICAgICAgICAgd2lkdGg9ezM1MH1cclxuICAgICAgICAgICAgICBoZWlnaHQ9ezIwMH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9e2AvcG9zdC8ke3Bvc3QuaWR9YH0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02XCI+XHJcbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBtYi0yXCI+e3Bvc3QudGl0bGV9PC9oMj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTRcIj57cG9zdC5kYXRlfSAoMTA6MDgpPC9wPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDAgbWItNFwiPntwb3N0LmNvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSl9XHJcbiAgICAgIHtsb2FkaW5nICYmIDxwPkxvYWRpbmcuLi48L3A+fSB7Lyog66Gc65SpIOykkeydvCDrlYwg7ZGc7IucICovfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJ1c2VBdXRoIiwiYXhpb3MiLCJMaW5rIiwibXlMaXN0IiwidXNlciIsInVzZXJJZCIsImJvZHkiLCJpZCIsImJsb2dQb3N0cyIsInNldEJsb2dQb3N0cyIsInBhZ2UiLCJzZXRQYWdlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJoYXNOZXh0UGFnZSIsInNldEhhc05leHRQYWdlIiwic2Nyb2xsUmVmIiwibXlCbG9nUG9zdCIsInJlcyIsImdldCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwic3RhdHVzIiwiZGF0YSIsInByZXZQb3N0cyIsInBvc3RzIiwiZXJyb3IiLCJyZXNwb25zZSIsImxlbmd0aCIsImFsZXJ0IiwibXNnIiwiaGFuZGxlU2Nyb2xsIiwic2Nyb2xsVG9wIiwid2luZG93Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJkb2N1bWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsInNjcm9sbFBlcmNlbnRhZ2UiLCJwcmV2UGFnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJtYXAiLCJwb3N0IiwiaW5kZXgiLCJpbWciLCJzcmMiLCJ0aHVtYm5haWxfZmlsZSIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwiaHJlZiIsImgyIiwidGl0bGUiLCJwIiwiZGF0ZSIsImNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/(post)/post/myList/page.jsx\n"));

/***/ })

});