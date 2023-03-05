export type Data = {
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
    decoy_port: number | string;
    decoy_type: string;
}

export type optionsType = {
    name: string,
    value: string
}

export type uniqueValueType = {
    name: string,
    checked: boolean
}

