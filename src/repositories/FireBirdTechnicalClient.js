import { getConnection } from "../db/fireBird.js";

export const FireBirdTechnicalClient = {

    findAll: async (dbEnvKey) => {
        return new Promise((resolve, reject) => {
            getConnection(dbEnvKey, (err, db) => {
              if (err) return reject(err);

              const query = ` 
                SELECT 
                 PKTECNICO AS IDTECNICO,
                 NMTECNICO AS NOME,
                 ATIVO
                 FROM TBTECNICO
                 WHERE ATIVO = 1
                 ORDER BY NMTECNICO
     `;

              db.query(query, (err, rows) => {
                            db.detach();
                            if (err) return reject(err);

                            resolve(rows || []);
                        });
                    });
                });
              }
}
  



 