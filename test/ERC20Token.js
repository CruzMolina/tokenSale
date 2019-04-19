var ERC20Token = artifacts.require("ERC20Token");

/*
its not needed
just run it and make some sort of assert
like make sure the balance of the owner is reduced afteer a transfer
with balanceOf and assert.equal
*/
let instance;

beforeEach( async () => {
  instance = await ERC20Token.deployed();

});
contract("ERC20", async accounts => {
    describe('constructor', () => {
      it("sets the total supply upon deployment", async () => {
        let balance = await instance.totalSupply();
        assert.equal(balance.toNumber(), 1000000,'sets the total supply to 1,000,000')
        
      });
      it("gives initial supply to msg.sender", async() =>{
        let adminBalance = await instance.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber(),1000000,'testing msg.sender balance');
      });
      it("has the proper token name", async() => {
        let name = await instance.name();
        assert.equal(name, 'soycoin', 'has the correct name');
      });
      it("has the proper symbol", async() => {
        let symbol = await instance.symbol();
        assert.equal(symbol, 'soy', 'has the correct symbol');
      });
  });
  describe('transfer', () => {
    it('successfully transfers', async() => {
      let transfer;
      try{
        transfer = await instance.transfer(accounts[1],50);
      }
      catch (error) {
        assert.fail(transfer.error.messageindexOf('revert') >=0, 'error message must contain revert');
      }
    });

    it('rejects above actual balance transfers', async() => {
      await instance.transfer(accounts[1], 999999, { from: accounts[0] });
    });
  });
  
  describe('approve', () => {
    it('approves tokens for delegated transfer', async() => {
      let approval =  await instance.approve(accounts[1], 100);
      assert.equal(approval, true, 'it returns true');
    });

    it("testing allowance", async() => {
      let allowanceTest = await instance.allowance(accounts[0],  accounts[1]);
      assert.equal(allowanceTest.toNumber(), 100, 'stores the allowance for delegated transfer');
    });
  });

  describe('transfer from', () => {
    it("properly rejects invalid balance", async() => {
      let accountOneBalance = await instance.balanceOf(accounts[1]);
      assert.equal(accountOneBalance.toNumber() <= 100, "right amount");
      
    });

  });

});