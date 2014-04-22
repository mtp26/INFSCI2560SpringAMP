-- Drop Everything
drop table Study;
drop table Researcher;
drop table Participant;
drop table Participating;
drop table Keywords;
drop table KeywordMatch;

-- Create Schema
create table Researcher ( researcherId int auto_increment, firstName varchar(50), lastName varchar(50), password varchar(100), email varchar(100), phoneNumber varchar(20), primary key (researcherId) );

create table Participant ( participantId int auto_increment, firstName varchar(30), lastName varchar(30), email varchar(100), primary key (participantId) );

create table Study ( studyId int auto_increment, title varchar(300), length int, compensationAmount numeric, compensationType varchar(20), eligibility text, description text, startDate date, endDate date,  IBR varchar(20), ownerId int, calPub text, calPriv text, primary key (studyId), foreign key (ownerId) references Researcher (researcherId) );

create table Participating ( participantId int, studyId int, primary key(participantId, studyId) );

create table Keywords (keywordId int auto_increment, primary key (keywordId), keyword varchar(100));

create table KeywordMatch(studyId int, keywordId int, primary key (studyId, keywordId), foreign key (studyId) references Study (studyId), foreign key (keywordId) references Keywords (keywordId) );

-- Test Data
insert into Researcher (firstName, lastName, password, email) values ('Richard', 'Anderson', '', 'rla20@pitt.edu');
insert into Researcher (firstName, lastName, password, email) values ('Max', 'Putas', '', 'mputas@someemail.com');
insert into Researcher (firstName, lastName, password, email) values ('Kayla', 'Mormak', '', 'kmormak@thisotheremail.com');
insert into Participant (firstName, lastName, email) values ('Random', 'Person', 'none@none.com');
insert into Participant (firstName, lastName, email) values ('John', 'Doe', 'jonedoe@com.com');
insert into Participant (firstName, lastName, email) values ('Jane', 'Doe', 'janedoe@com.com');
insert into Participant (firstName, lastName, email) values ('The', 'Moon', 'themoon@orbiting.com');
insert into Study (title, length, compensationAmount, compensationType, eligibility, description, startDate, endDate, ibr, ownerId) values ('A study of life', 60, 25, 'cash', '{\"r1\":\"No restrictions\",\"r2\":\"Healthy\"}', 'A study to determine how people live their lives', '2014-01-01', '2014-06-01', 'xyz2348', 1);
insert into Participating values (1,1);
insert into Participating values (2,1);
insert into Participating values (3,1);

insert into Researcher (firstName, lastName, password, email, phoneNumber) values ('Dr.', 'Meanie', '', 'meanie@pitt.edu', '1-2345');
insert into Study (title, length, compensationAmount, compensationType, eligibility, description, startDate, endDate, ibr, ownerId, calPub, calPriv) values ('The Effects of Coffee Deprivation on IT Students', 60, 10, 'Credit', '{\"Elig_Age\":\"2 3\", \"Elig_Gen\":\"0\", \"Elig_Lang\":\"0\", \"Elig_Vision\":\"0\", \"Elig_Edu\":\"2 3 4 5\", \"Elig_Exp\":\"0\", \"Elig_Exp_Type\":\"\", \"Elig_Cit\":\"0\", \"Elig_Other\":\"Must be a student\"}', 'Coffee deprivation in IT students during finals week.', '2014-04-14', '2014-04-25', '1', 4, 'http://www.google.com', 'http://www.google.com');
insert into Keywords (keyword) values ('coffee');
insert into Keywords (keyword) values ('finals');
insert into KeywordMatch (studyId, keywordId) values (2, '1');
insert into KeywordMatch (studyId, keywordId) values (2, '2');
insert into Participating values (1,2);
insert into Participating values (2,2);
insert into Participating values (3,2);