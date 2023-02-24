const ether = require("ethers");
const fs = require("fs");
require("dotenv").config();

const main = async () => {
    const Provider = new ether.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ether.Wallet(process.env.PRIVATE_KEY, Provider);
    const StorageFactoryAbi = fs.readFileSync(
        __dirname + "/contracts_StorageFactory_sol_StorageFactory.abi",
        "utf8"
    );
    const StorageFactoryBin = fs.readFileSync(
        __dirname + "/contracts_StorageFactory_sol_StorageFactory.bin",
        "utf8"
    );

    const contractFactory = new ether.ContractFactory(
        StorageFactoryAbi,
        StorageFactoryBin,
        wallet
    );

    const contract = await contractFactory.deploy();
    
    const receipt = await contract.deployTransaction.wait(1);
    console.log(receipt);

    console.log("\n\n\n\n\n");

    console.log("Creation of simple storage");
    const transactionCreateStorage = await contract.createStorage();
    const receiptTransactionCreateStorage = await transactionCreateStorage.wait(1);
    console.log(receiptTransactionCreateStorage);

    console.log("\nCreation of simple storage 2");
    const transactionCreateStorage2 = await contract.createStorage();
    const receiptTransactionCreateStorage2 = await transactionCreateStorage2.wait(1);
    console.log(receiptTransactionCreateStorage2);


    console.log("\nAdding Number of simple storage 1");
    const transactionStoreStorage1 = await contract.sfstore("0", "1");
    const receiptTransactionStoreStorage1 = await transactionStoreStorage1.wait(1);
    console.log(receiptTransactionStoreStorage1);
    
    console.log("\nAdding Number of simple storage 2");
    const transactionStoreStorage2 = await contract.sfstore("1", "2");
    const receiptTransactionStoreStorage2 = await transactionStoreStorage2.wait(1);
    console.log(receiptTransactionStoreStorage2);

    const storage1 = await contract.sfGet("0");
    console.log(storage1.toString());
    const storage2 = await contract.sfGet("1");
    console.log(storage2.toString());

};

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
    });
