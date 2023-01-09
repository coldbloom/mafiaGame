import { JsonRpc } from "eosjs";

export class UserInfoService {
    constructor() {
        this.collection = "vendettaciti";
        this.rpc = new JsonRpc("https://testnet.waxsweden.org", { fetch });
    }

    async getUser(activeUser) {
        //console.log(activeUser)
        return await this.rpc.get_table_rows({
            json: true, // Get the response as json
            code: "vendettaciti", // Contract that we target
            scope: "vendettaciti", // Account that owns the data
            table: "users", // Table name
            // lower_bound: activeUser.accountName, // Table primary key value
            upper_bound: activeUser.accountName, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
            reverse: false, // Optional: Get reversed data
            show_payer: false, // Optional: Show ram payer
        });
    }

    async createNewUser(ual) {
        const { activeUser } = ual;
        console.log(activeUser)
        await activeUser.signTransaction(
            {
                actions: [
                    {
                        account: "vendettaciti",
                        name: "newuser",
                        authorization: [
                            {
                                actor: activeUser.accountName,
                                permission: "active",
                            },
                        ],
                        data: {
                            owner: activeUser.accountName,
                        },
                    },
                ],
            },
            {
                blocksBehind: 3,
                expireSeconds: 30,
            }
        );
    }

}