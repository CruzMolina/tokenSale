const ERC20Token = artifacts.require("ERC20Token");
const ERC20TokenSale = artifacts.require("ERC20TokenSale");

let instance;
let tokenPrice;
let buyer;

beforeEach( async () => {
    instance = await ERC20TokenSale.deployed();
    tokenPrice = 1000000000000000; // in wei 0.001 ether
  });
contract('ERC20TokenSale', function(accounts){
    buyer = accounts[1];
    describe('constructor', () => {
        it('has contract address', async () => {
            let address = await instance.address;
            assert.notEqual(address, 0x0, 'has contract address');
        });

        it('has token contract address', async () => {
            let tokenContractAddress = await instance.tokenContract();
            assert.notEqual(tokenContractAddress, 0x0, 'has token contract address');  
        });

        it('token price is correct', async () => {
            let price = await instance.tokenPrice();
            assert.equal(price, tokenPrice, 'token price is correct');
        });

    });

    describe("buyTokens", () => {
        it('facilitates token buying', async () => {
            let numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice;
            await instance.buyTokens(numberOfTokens, {from: buyer, value: value});
            let amount = await instance.tokenSold();
            assert.equal(amount.toNumber(), numberOfTokens, "increments the number of tokens sold");
        });
    });
});