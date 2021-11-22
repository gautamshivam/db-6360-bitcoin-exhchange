module.exports.findUserByIdSQL = (id) => {
    return `select * from user where user_id=${id}`
}

module.exports.findUserByEmailPwdSQL = (auth) => {
    return `select * from user where email='${auth.email}' and pwd='${auth.pwd}'`
}

module.exports.findAllClientsSQL = () => {
    return `select * from user 
    left join client on  user.user_id = client.client_id
    where user_type='CLIENT'`
}

module.exports.findAllTradersSQL = () => {
    return `select * from user 
    where user_type='TRADER'`
}

module.exports.findOneClientsSQL = (id) => {
    return `select * from user
    left join client on  user.user_id = client.client_id
    where user_type='CLIENT' and
    user.user_id = ${id}`
}

module.exports.findAllClientsForTraderSQL = (id) => {
    return `select trader_id, client_id, bitcoin_balance, fiat_balance, fname, lname, email   from clientTraderInfo, user
    where clientTraderInfo.trader_id = ${id} and clientTraderInfo.client_id = user.user_id`
}

module.exports.findOneClientForTraderSQL = (trader_id, client_id) => {
    return `select trader_id, client_id, bitcoin_balance, fiat_balance, fname, lname, email   from clientTraderInfo, user
    where clientTraderInfo.trader_id = ${trader_id} and clientTraderInfo.client_id = ${client_id} and clientTraderInfo.client_id = user.user_id`
}

module.exports.findAllTradersForClientSQL = (id) => {
    return `select trader_id, client_id, bitcoin_balance, fiat_balance, fname, lname, email   from clientTraderInfo, user
    where clientTraderInfo.client_id = ${id} and clientTraderInfo.trader_id = user.user_id`
}

module.exports.findAllBankTransactions = () => {
    return `select tid, client_id, trader_id, amount, type, timestamp, status, 
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email 
    from (select * from bankTransactions, user u1 where bankTransactions.client_id = u1.user_id) r left join user u2 on  r.trader_id = u2.user_id`
}

module.exports.findAllBankTransactionsClientTrader = (client_id, trader_id) => {
    return `select tid, client_id, trader_id, amount, type, timestamp, status, 
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email 
    from (select * from bankTransactions, user u1 where bankTransactions.client_id = u1.user_id and client_id=${client_id} and trader_id=${trader_id}) r left join user u2 on  r.trader_id = u2.user_id`
}

module.exports.findAllBankTransactionsClient = (client_id) => {
    return `select tid, client_id, trader_id, amount, type, timestamp, status, 
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email 
    from (select * from bankTransactions, user u1 where bankTransactions.client_id = u1.user_id and client_id=${client_id}) r left join user u2 on  r.trader_id = u2.user_id`
}

module.exports.findAllBankTransactionsTrader = (trader_id) => {
    return `select tid, client_id, trader_id, amount, type, timestamp, status, 
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email 
    from (select * from bankTransactions, user u1 where bankTransactions.client_id = u1.user_id and trader_id=${trader_id}) r left join user u2 on  r.trader_id = u2.user_id`
}

module.exports.findAllBTCTrades = () => {
    return `select tid, client_id, trader_id, btc_qty, btc_rate, transaction_type, commission_type, commission_value, timestamp,
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email
    from (select * from bitcoinTransactions, user u1 where bitcoinTransactions.client_id = u1.user_id) r left join user u2 on  r.trader_id = u2.user_id`
}

module.exports.findAllBTCTradesClientTrader = (client_id, trader_id) => {
    return `select tid, client_id, trader_id, btc_qty, btc_rate, transaction_type, commission_type, commission_value, timestamp,
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email
    from (select * from bitcoinTransactions, user u1 where bitcoinTransactions.client_id = u1.user_id and bitcoinTransactions.client_id = ${client_id} and bitcoinTransactions.trader_id = ${trader_id}) r, user u2 where r.trader_id = u2.user_id`
}

module.exports.findAllBTCTradesClient = (client_id) => {
    return `select tid, client_id, trader_id, btc_qty, btc_rate, transaction_type, commission_type, commission_value, timestamp,
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email
    from (select * from bitcoinTransactions, user u1 where bitcoinTransactions.client_id = u1.user_id and bitcoinTransactions.client_id = ${client_id}) r, user u2 where r.trader_id = u2.user_id`
}

module.exports.findAllBTCTradesTrader = (trader_id) => {
    return `select tid, client_id, trader_id, btc_qty, btc_rate, transaction_type, commission_type, commission_value, timestamp,
    r.fname as client_fname, r.lname as client_lname, r.email as client_email,  u2.fname as trader_fname, u2.lname as trader_lname, u2.email as trader_email
    from (select * from bitcoinTransactions, user u1 where bitcoinTransactions.client_id = u1.user_id and bitcoinTransactions.trader_id = ${trader_id}) r, user u2 where r.trader_id = u2.user_id`
}