import logger from "@/config/winston";

export function parseToArray(subscribeList) {
    try {
        for (let i = 0; i < subscribeList.length; i++) {
            if (subscribeList[i].categorySet.indexOf(',') != -1) {
                const categorySet = subscribeList[i].categorySet.split(',');
                subscribeList[i].categorySet = categorySet;
            } else {
                let categorySet = [];
                categorySet.push(subscribeList[i].categorySet)
                subscribeList[i].categorySet = categorySet;
            }
            if (subscribeList[i].emailList.indexOf(',') != -1) {
                const emailList = subscribeList[i].emailList.split(',');
                subscribeList[i].emailList = emailList;
            } else {
                let emailList = [];
                emailList.push(subscribeList[i].emailList);
                subscribeList[i].emailList = emailList;
            }
        }

        return subscribeList;
    } catch (error) {
        logger.error(`parseToArray Error, message : ${error.toString()}`, { message: error.toString() });
    }
}

export function filter(subscribeList, categoryList: string[]) {
    try {
        let bucket = [];

        for (let i = 0; i < subscribeList.length; i++) {
            for (let category of categoryList) {
                if (subscribeList[i] !== undefined && subscribeList[i].categorySet.indexOf(category) != -1) {
                    bucket.push(subscribeList[i]);
                    subscribeList[i] = undefined;
                }
            }
        }
        return bucket;
    } catch (error) {
        logger.error(`filter Error, message : ${error.toString()}`, { message: error.toString() });
    }
}