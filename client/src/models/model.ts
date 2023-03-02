export default class Data {
    id: string;
    type: string;
    severity: string;
    kill_chain_phase: string;
    timestamp: string;
    attacker_id: string;
    attacker_ip: string;
    attacker_name: string;
    attacker_port: number;
    decoy_id: number;
    decoy_name: string;
    decoy_group: string;
    decoy_ip: string;
    decoy_port: number;
    decoy_type: string;

    constructor() {
        this.id = "";
        this.type = "";
        this.severity = "";
        this.kill_chain_phase = "";
        this.timestamp = "";
        this.attacker_id = "";
        this.attacker_ip = "";
        this.attacker_name = "";
        this.attacker_port = 0;
        this.decoy_id = 0;
        this.decoy_name = "";
        this.decoy_group = "";
        this.decoy_ip = "";
        this.decoy_port = 0;
        this.decoy_type = "";
    }
}

