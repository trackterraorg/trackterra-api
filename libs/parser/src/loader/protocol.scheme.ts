import { Chain } from '@trackterra/chains/enums/chain.enum';
import * as Joi from 'joi';
import { parserClasses, TxLabel, TxTag } from '../parser';
import { ProtocolType } from './protocol.interface';

export const classifierScheme = {
  shouldExistAttributes: Joi.array().required(),
  shouldNotExistAttributes: Joi.array().required(),
  contractAddressExtractKeys: Joi.object()
    .keys({
      mainKey: Joi.string().allow(null, ''),
      contractKey: Joi.string().allow(null, ''),
    })
    .required(),
  ignoreContract: Joi.boolean().required(),
  skipForContracts: Joi.array().items(Joi.string()),
};

export const parserScheme = {
  class: Joi.string().valid(...parserClasses),
  description: Joi.string().allow(null),
};

export const transactionScheme = Joi.object().keys({
  name: Joi.string().required().description('Transaction name is required'),
  contract: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string())
    .allow(null, ''),
  classifier: Joi.object().keys(classifierScheme).required(),
  isEliminator: Joi.boolean(), // eliminates other events in the tx
  requiresOtherEvents: Joi.boolean(),
  parserClass: Joi.string()
    .valid(...parserClasses)
    .allow(null),
  tag: Joi.string()
    .allow(null, '')
    .valid(...Object.values(TxTag)),
  description: Joi.string().allow(null),
});

export const protocolSchema = Joi.object()
  .keys({
    name: Joi.string().required().description('Protocol name is required'),
    chain: Joi.string()
      .required()
      .valid('Common', ...Object.values(Chain))
      .description('Chain is required'),
    type: Joi.string()
      .required()
      .valid(ProtocolType.Contract, ProtocolType.Native, ProtocolType.Fail),
    priority: Joi.number()
      .greater(-1)
      .less(101)
      .required()
      .description('Priority is required'),
    transactions: Joi.array().min(1).items(transactionScheme),
  })
  .unknown();
