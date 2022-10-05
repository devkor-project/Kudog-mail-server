export default async (categoryList: string[]) => {

}

/**
 * 1안 - query로 해결
select keywordList, group_concat(userId) as userList from
(
select distinct u.userId, u.email , group_concat(distinct keyword) as keywordList from user u
inner join keywordperuser k on u.userId = k.userId
inner join keyword k2 on k.keywordId = k2.keywordId
group by u.userId
) M
group by keywordList;

 * 2안 - 알고리즘 작성 
 */