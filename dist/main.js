/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _png_asset_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./png_asset_management */ \"./src/png_asset_management.js\");\n\n\n\n\n\n\nclass Background{\n    constructor(){\n        this.background;\n    }\n\n    draw(){\n\n    }\n    \n    animate(){\n\n\n    }\n    \n\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Background);\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _sandbag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sandbag */ \"./src/sandbag.js\");\n/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background */ \"./src/background.js\");\n\n\n\n\nclass Game{\n    constructor(ctx){\n        this.ctx =ctx;\n        this.dimensions = {width: canvas.width, height: canvas.height};\n    }\n\n    animate(){\n        \n    }\n    renderFrame(){\n\n    }\n\n    newGame(){\n        \n\n    }\n\n  \n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\nconst canvas = document.getElementById(\"sandbag-game\");\nconst ctx = canvas.getContext(\"2d\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/phy_object.js":
/*!***************************!*\
  !*** ./src/phy_object.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _png_asset_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./png_asset_management */ \"./src/png_asset_management.js\");\n\n \n\n//refers to any body that must obey the laws of game physics\nconst PHYSICS_CONSTANTS ={\n    GRAVITY: -4.8,\n    DEFAULT_PLAYER_POS: [40, 20],\n    DEFAULT_BAG_POS: [50, 20],\n\n};\n\n\nclass PhysicsObject{\n    constructor(){\n        this.height;\n        this.width;\n        this.mass;\n        this.pos;\n        this.accelX = 0;\n        this.accelY = 0;\n        this.velX = 0;\n        this.velY = 0;\n        this.damage; //damage coefficient\n        this.force; //force coefficient\n        this.frames;\n        \n    }\n\n    inCollision(){\n\n    }\n\n    draw(){\n\n    }\n\n    animate(){\n\n    }\n\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhysicsObject);\n\n//# sourceURL=webpack:///./src/phy_object.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _phy_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./phy_object */ \"./src/phy_object.js\");\n\n\nclass Player extends _phy_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(options){\n\n    }\n\n\n    move(){\n        \n    }\n\n    lightAttack(){\n\n    }\n\n    chargeAttack(){\n\n    }\n\n    jump(){\n\n    }\n\n}\n\n//character classes\n\n\nclass Noctis extends Player{\n\n}\n\n\nclass Tifa extends Player{\n\n}\n\nclass TwoB extends Player{\n\n}\n\nclass TestChar extends Player{\n    \n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({Player, Noctis, Tifa, TwoB, TestChar}); \n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/png_asset_management.js":
/*!*************************************!*\
  !*** ./src/png_asset_management.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nclass PhotoImport{\n    constructor (){\n\n    }\n\n    importEffectAssets(){\n        \n    }\n\n    importCharacterAssets(){\n\n    }\n\n\n    importSandbagAssets(){\n\n\n    }\n\n    importBackgroundAsset(){\n\n    }\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoImport);\n\n//# sourceURL=webpack:///./src/png_asset_management.js?");

/***/ }),

/***/ "./src/sandbag.js":
/*!************************!*\
  !*** ./src/sandbag.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _phy_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./phy_object */ \"./src/phy_object.js\");\n\n\n\nclass SandbagTotem{\n    constructor(){\n\n    }\n\n    launchSandbag(){\n\n    }\n\n    \n\n    takeCollision(){\n\n    }\n\n    absorbDamage(){\n\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SandbagTotem);\n\n//# sourceURL=webpack:///./src/sandbag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;