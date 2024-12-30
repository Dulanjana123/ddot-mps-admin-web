const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core/"),
      "@config": path.resolve(__dirname, "./src/config/"),
      "@atoms": path.resolve(__dirname, "./src/shared-components/atoms/"),
      "@molecules": path.resolve(
        __dirname,
        "./src/shared-components/molecules/"
      ),
      "@organisms": path.resolve(
        __dirname,
        "./src/shared-components/organisms/"
      ),
      "@enums": path.resolve(__dirname, "./src/types/enums/"),
      "@constants": path.resolve(__dirname, "./src/types/constants/"),
      "@layout": path.resolve(__dirname, "./src/types/layout/"),
      "@common-element-types": path.resolve(
        __dirname,
        "./src/types/common-elements/"
      ),
      "@interfaces": path.resolve(__dirname, "./src/types/interfaces/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@store": path.resolve(__dirname, "./src/store/"),
      "@modules": path.resolve(__dirname, "./src/modules/"),
      "@layouts": path.resolve(__dirname, "./src/layout/"),
      "@common-elements": path.resolve(__dirname, "./src/common-elements/"),
      "@data": path.resolve(__dirname, "./src/data/"),
    },
  },
};
