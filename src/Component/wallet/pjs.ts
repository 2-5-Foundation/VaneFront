'use client'

import { web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";

let enablePolkadotExtensionCache: Promise<boolean>;
export const enablePolkadotExtension = async (): Promise<boolean> => {
  if (enablePolkadotExtensionCache) return enablePolkadotExtensionCache;

  enablePolkadotExtensionCache = (async () => {

    const extensions = await web3Enable("Vane Trust");

    if (extensions.length === 0) {
        return false
    }
    return true
  })();

  return enablePolkadotExtensionCache;
};

export const getSignerFromWallet = async (
  account: InjectedAccountWithMeta
): Promise<Signer> => {
  await enablePolkadotExtension();
  
  const injector = await web3FromSource(account.meta.source);
  const signer = injector.signer;

  return signer;
};

// export const getSignerFromWalletLess = async (
//   account: string
// ): Promise<Signer> => {
//   await enablePolkadotExtension();
//   const { web3FromAddress } = await import("@polkadot/extension-dapp");
//   const injector = await web3FromAddress(account);
//   const signer = injector.signer;

//   return signer;
// };