CREATE TABLE master_node (
    node_name VARCHAR(255),
    node_number VARCHAR(255) PRIMARY KEY,
    actual VARCHAR(255),
    delta VARCHAR(255),
    tp_total VARCHAR(255),
    cus VARCHAR(255),
    ebi VARCHAR(255),
    off VARCHAR(255)
);

INSERT INTO master_node VALUES
('Revenue', '1', '380,421.295.73', '0.14', '380,421.295.73', '123,875,567.44', '122,603,114.82', '133,942,613.33'),
('COGS', '2', '-302,354.495.60', '0.36', '-302,354.495.60', '123,875,567.44', '122,603,114.82', '133,942,613.33'),
('Gross Profilt', '3', '78,421.295.73', '0.50', '78,421.295.73', '25,875,567.44', '20,603,114.82', '10,942,613.33');

CREATE TABLE child_node (
    node_name VARCHAR(255),
    node_number VARCHAR(255),
    actual VARCHAR(255),
    delta VARCHAR(255),
    tp_total VARCHAR(255),
    cus VARCHAR(255),
    ebi VARCHAR(255),
    off VARCHAR(255),
    FOREIGN KEY (node_number) REFERENCES master_node(node_number)
);

INSERT INTO child_node VALUES
('1000-Sales', '1', '380,421.295.73', '0.14', '380,421.295.73', '123,875,567.44', '122,603,114.82', '133,942,613.33'),
('2000-COGS', '2', '-302,354.495.60', '0.36', '-302,354.495.60', '123,875,567.44', '122,603,114.82', '133,942,613.33');