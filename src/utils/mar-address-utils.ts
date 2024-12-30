import globalAppConfig from "@config/global-app-config";

const mapApiRejectionCharacters = globalAppConfig.mapApiRejectionCharacters;

const isValidMARAddressSearch = (searchText: string): Boolean => {
    for (const char of mapApiRejectionCharacters) {
        if (searchText.includes(char)) {
            return false;
        }
    }

    return true;
};

export default isValidMARAddressSearch;