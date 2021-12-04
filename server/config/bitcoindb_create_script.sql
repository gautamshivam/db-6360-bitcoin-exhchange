-- bitcoin database

use bitcoindb;

-- table user

CREATE TABLE user(
	user_id INTEGER UNIQUE NOT NULL PRIMARY KEY auto_increment,
    fname VARCHAR(200),
    lname VARCHAR(200),
    phone VARCHAR(10),
    cell_number VARCHAR(10),
    user_type VARCHAR(10),
    email VARCHAR(200) UNIQUE NOT NULL,
    pwd VARCHAR(200)
);


-- table client 

CREATE TABLE client(
	client_id INTEGER PRIMARY KEY,
    bitcoin_balance REAL,
    fiat_balance REAL,
    membership_level VARCHAR(10) default 'SILVER',  -- GOLD, SILVER
    
    FOREIGN KEY (client_id) REFERENCES user(user_id) ON DELETE CASCADE
);


-- trigger insertIntoClient
Delimiter //
create trigger insertIntoClient AFTER INSERT ON user
for each row
BEGIN
	IF EXISTS(SELECT user_id FROM user WHERE user_id=NEW.user_id AND user_type='CLIENT') THEN
	INSERT INTO  client(client_id, bitcoin_balance, fiat_balance, membership_level) VALUES(NEW.user_id, 0.00, 0.00,'SILVER');
    END IF;
END;//
delimiter ;



-- insert user into user table

INSERT INTO user (fname, lname, phone, cell_number, user_type, email, pwd) 
VALUES 
	('shivam','gautam','1234567890','','MANAGER','sg@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('sourabh','tantuway','1111111111','','TRADER','st@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('srushti','sachdev','2222222222','','TRADER','ss@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('harika','nittala','3333333333','','TRADER','hn@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('deepak','honakeri','4444444444','','TRADER','dh@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW');

-- insert client users

INSERT INTO user (fname, lname, phone, cell_number, user_type, email, pwd) 
VALUES 
	('client1','c1_lastname','1111111111','', 'CLIENT','c1@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('client2','c2_lastname','2222222222','', 'CLIENT','c2@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('client3','c3_lastname','3333333333','', 'CLIENT','c3@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('client4','c4_lastname','4444444444','', 'CLIENT','c4@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW'),
	('client5','c5_lastname','5555555555','', 'CLIENT','c5@gmail.com','$2a$10$e7HYfyErebATy6QSDU/zLucOAjyh8LHg2/QVhw5fmhdM3EiZYrzrW');


-- table address

CREATE TABLE address(
	user_id INTEGER PRIMARY KEY,
    street VARCHAR(200),
    city VARCHAR(200),
    state VARCHAR(200),
    zip VARCHAR(200),
    
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- insert into address table

INSERT INTO address(user_id, street, city, state, zip)
VALUES
	(1,'street shivam','city shivam','state shivam','11111'),
	(2,'street sourabh','city sourabh','state sourabh','22222'),
	(3,'street srushti','city srushti','state srushti','33333'),
	(4,'street harika','city harika','state harika','44444'),
	(5,'street deepak','city deepak','state deepak','55555'),	
    (6,'street c1','city c1','state c1','11111'),
	(7,'street c2','city c2','state c2','22222'),
	(8,'street c3','city c3','state c3','33333'),
	(9,'street c4','city c4','state c4','44444'),
	(10,'street c5','city c5','state c5','55555');
    
-- table clientTraderInfo 

CREATE TABLE clientTraderInfo(
	trader_id INTEGER,
    client_id INTEGER,
    bitcoin_balance REAL,
    fiat_balance REAL,
    
    PRIMARY KEY (trader_id, client_id),
    FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (trader_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- INSERT INTO  clientTraderInfo(trader_id, client_id, bitcoin_balance, fiat_balance)
-- VALUES
-- (2,6, 0.00, 2000.00),
-- (2,7, 0.00, 1000.00),(2,8, 0.00, 4000.00),
-- (3,9, 0.00, 3000.00),
-- (3,10, 0.00, 0.00);
    
    
-- table bankTransactions

CREATE TABLE bankTransactions(
	tid integer UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
    client_id INTEGER,
    trader_id INTEGER null,
    amount REAL,
    type VARCHAR(10), -- DEPOSIT, WITHDRAWAL
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10), -- PENDING CANCELLED APPROVED
    
    FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (trader_id) REFERENCES user(user_id) ON DELETE CASCADE
);


-- defining trigger updateClientTraderInfo
Delimiter //
create trigger updateClientTraderInfo BEFORE INSERT ON bankTransactions
for each row
BEGIN
	IF NEW.type = 'DEPOSIT' THEN
    BEGIN
		IF (NEW.trader_id is null) THEN
			IF EXISTS(select client_id from client where client_id= NEW.client_id ) THEN
				UPDATE client set fiat_balance=(fiat_balance + NEW.amount) where client_id= NEW.client_id;
			ELSE
				INSERT INTO client(client_id, bitcoin_balance, fiat_balance, membership_level) VALUES (NEW.client_id, 0.00, NEW.amount,'SILVER');
            END IF;
		END IF;
	END;
    END IF;
END;//
delimiter ;


-- insert into bankTransactions

-- INSERT INTO bankTransactions (client_id, trader_id, amount, type, timestamp, status)
-- VALUES (6, null, 2000, 'DEPOSIT', CURRENT_TIMESTAMP, 'APPROVED'),
-- (6, 2, 2000, 'DEPOSIT', CURRENT_TIMESTAMP, 'PENDING'),
-- (7, 2, 1000, 'DEPOSIT', CURRENT_TIMESTAMP, 'PENDING'),
-- (8, 2, 4000, 'DEPOSIT', CURRENT_TIMESTAMP, 'PENDING'),
-- (9, 3, 3000, 'DEPOSIT', CURRENT_TIMESTAMP, 'PENDING');

   
-- table bitcoinTransactions

CREATE TABLE bitcoinTransactions(
	tid integer UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
    client_id INTEGER,
    trader_id INTEGER NULL,
    btc_qty REAL,
    btc_rate REAL,
	transaction_value REAL,
    transaction_type VARCHAR(10), -- BUY, SELL
    commission_type VARCHAR(10), -- FIAT, BTC
    commission_value REAL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (client_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (trader_id) REFERENCES user(user_id) ON DELETE CASCADE
);
    

-- trigger updateClientTraderInfoOnBtcTxn
Delimiter //
create trigger updateClientTraderInfoOnBtcTxn BEFORE INSERT ON bitcoinTransactions
for each row
BEGIN

	IF (NEW.trader_id is null) THEN
    BEGIN
		IF NEW.transaction_type = 'BUY'  THEN 
			IF ((select fiat_balance from client where client_id= NEW.client_id) - NEW.transaction_value)>=0 THEN
				UPDATE client set fiat_balance=(fiat_balance - NEW.transaction_value), bitcoin_balance=(bitcoin_balance+ NEW.btc_qty) where client_id= NEW.client_id;
			ELSE
            BEGIN
				signal sqlstate '45000' set message_text = 'not enough balance';
			END;
            END IF;
		END IF;
        
        IF NEW.transaction_type = 'SELL'  THEN 
			IF ((select bitcoin_balance from client where client_id= NEW.client_id) - NEW.btc_qty)>=0 THEN
				UPDATE client set fiat_balance=(fiat_balance + NEW.transaction_value), bitcoin_balance=bitcoin_balance- NEW.btc_qty where client_id= NEW.client_id;
			ELSE
            BEGIN
				signal sqlstate '45000' set message_text = 'not enough bitcoin to sell';
			END;
            END IF;
		END IF;
	END;
    ELSE 
    BEGIN
		IF NEW.transaction_type = 'BUY' THEN 
			IF ((select fiat_balance from clientTraderInfo where client_id= NEW.client_id AND trader_id= NEW.trader_id) - NEW.transaction_value)>=0 THEN
				UPDATE clientTraderInfo set fiat_balance=(fiat_balance - NEW.transaction_value), bitcoin_balance=bitcoin_balance+ NEW.btc_qty where client_id= NEW.client_id AND trader_id= NEW.trader_id;
			ELSE
            BEGIN
				signal sqlstate '45000' set message_text = 'not enough balance';
			END;
            END IF;
		END IF;
        
        IF NEW.transaction_type = 'SELL' THEN 
			IF ((select bitcoin_balance from clientTraderInfo where client_id= NEW.client_id AND trader_id= NEW.trader_id) - NEW.btc_qty)>=0 THEN
				UPDATE clientTraderInfo set fiat_balance=(fiat_balance + NEW.transaction_value), bitcoin_balance=bitcoin_balance-NEW.btc_qty where client_id= NEW.client_id AND trader_id= NEW.trader_id;
			ELSE
            BEGIN
				signal sqlstate '45000' set message_text = 'not enough bit coins to sell';
			END;
            END IF;
		END IF;
    END;
    END IF;
END;//
delimiter ;

-- defining trigger statusUpdClientTraderInfo
Delimiter //
create trigger statusUpdClientTraderInfo BEFORE UPDATE ON bankTransactions
for each row
BEGIN
	IF OLD.STATUS = 'PENDING' AND NEW.status='APPROVED' THEN
		BEGIN
			IF EXISTS(select trader_id from clientTraderInfo where client_id= NEW.client_id and trader_id=NEW.trader_id ) THEN
				UPDATE clientTraderInfo set fiat_balance=(fiat_balance + NEW.amount) where client_id= NEW.client_id and trader_id = NEW.trader_id;
			ELSE
				INSERT INTO  clientTraderInfo(trader_id, client_id, bitcoin_balance, fiat_balance) VALUES (NEW.trader_id,NEW.client_id, 0.00,NEW.amount);
            END IF;
        END;
    END IF;
END;//
delimiter ;


-- INSERT QUERYs for bitcoinTransactions
-- INSERT INTO bitcoinTransactions (client_id, trader_id, btc_qty, btc_rate, transaction_value, transaction_type,commission_type,commission_value,timestamp)
-- VALUES 
-- (6, null , 2, 1000, 3000, 'BUY','FIAT', 1000, CURRENT_TIMESTAMP ),
-- (6, null , 1, 1000, 2000, 'BUY','FIAT', 1000, CURRENT_TIMESTAMP );
