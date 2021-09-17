CREATE TABLE bites_article_tracking (
    user_id varchar(255),
    user_username varchar(255),
    article_id varchar(255),
    article_slug varchar(255),
    article_title varchar(255),
    href varchar(255),
    timestamp timestamp,
    block_id varchar(255),
    block_title varchar(255),
    block_type varchar(255),
    block_px int,
    block_percent float,
    block_seconds int 
);