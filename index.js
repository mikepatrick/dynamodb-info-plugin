'use strict';

const _ = require('lodash');
const chalk = require('chalk');

class DynamoInfoPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('aws');

    this.hooks = {
      'after:aws:info:displayFunctions': this.dynamoInfo.bind(this),
    };
  }
  findDynamoTables(resources) {
    return _.values(resources)
      .filter(item => {
        return item.Type === 'AWS::DynamoDB::Table';
      })
      .map(table => {
        return {
          tableName: table.Properties.TableName,
          readCapacity: table.Properties.ProvisionedThroughput.ReadCapacityUnits,
          writeCapacity: table.Properties.ProvisionedThroughput.WriteCapacityUnits,
        };
      });
  }

  dynamoInfo() {
      const tables = this.findDynamoTables(this.serverless.service.resources.Resources);
      // @ts-ignore
      this.serverless.cli.consoleLog(`${chalk.yellow('tables (read/write):')}`);
      tables.map((table) => {
        this.serverless.cli.consoleLog(`  ${table.tableName} (${table.readCapacity}/${table.writeCapacity})`);
      });
  }
}

module.exports = DynamoInfoPlugin;
