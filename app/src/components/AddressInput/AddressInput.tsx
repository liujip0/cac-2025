import { Checkbox, Input, Select } from "@liujip0/components";
import styles from "./AddressInput.module.css";

export const ADDRESS_FIELD_SEPARATOR = "|||";
// eslint-disable-next-line react-refresh/only-export-components
export const ADDRESS_TYPES = {
  US: "US",
  VIRTUAL: "VIRTUAL",
} as const;
// eslint-disable-next-line react-refresh/only-export-components
export const ADDRESS_INITIAL_VALUE: Record<keyof typeof ADDRESS_TYPES, string> =
  {
    US: ADDRESS_TYPES.US + ADDRESS_FIELD_SEPARATOR.repeat(5),
    VIRTUAL: ADDRESS_TYPES.VIRTUAL + ADDRESS_FIELD_SEPARATOR,
  };

type AddressInputProps = {
  id: string;
  value: string;
  onChange?: (value: string) => void;
};
export default function AddressInput({
  id,
  value,
  onChange,
}: AddressInputProps) {
  const splitAddress = value.split(ADDRESS_FIELD_SEPARATOR);

  return (
    <div className={styles.container}>
      <Checkbox
        id={id + "-virtual"}
        value={splitAddress[0] === ADDRESS_TYPES.VIRTUAL}
        onChange={(value) => {
          onChange?.(
            value ? ADDRESS_INITIAL_VALUE.VIRTUAL : ADDRESS_INITIAL_VALUE.US
          );
        }}
        label="Virtual"
      />
      {
        {
          US: (
            <>
              <Input
                id={id + "-line1"}
                value={splitAddress[1]}
                onChange={(value) => {
                  onChange?.(
                    splitAddress
                      .toSpliced(1, 1, value)
                      .join(ADDRESS_FIELD_SEPARATOR)
                  );
                }}
                label="Address Line 1"
              />
              <Input
                id={id + "-line2"}
                value={splitAddress[2]}
                onChange={(value) => {
                  onChange?.(
                    splitAddress
                      .toSpliced(2, 1, value)
                      .join(ADDRESS_FIELD_SEPARATOR)
                  );
                }}
                label="Address Line 2"
              />
              <div className={styles.cityState}>
                <Input
                  className={styles.city}
                  id={id + "-city"}
                  value={splitAddress[3]}
                  onChange={(value) => {
                    onChange?.(
                      splitAddress
                        .toSpliced(3, 1, value)
                        .join(ADDRESS_FIELD_SEPARATOR)
                    );
                  }}
                  placeholder="City"
                  label="City"
                />
                <Select
                  className={styles.stateZip}
                  id={id + "-state"}
                  value={splitAddress[4]}
                  onChange={(value) => {
                    onChange?.(
                      splitAddress
                        .toSpliced(4, 1, value)
                        .join(ADDRESS_FIELD_SEPARATOR)
                    );
                  }}
                  label="State">
                  <option value=""></option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                  <hr />
                  <option value="DC">DC</option>
                  <option value="AS">AS</option>
                  <option value="GU">GU</option>
                  <option value="MP">MP</option>
                  <option value="PR">PR</option>
                  <option value="VI">VI</option>
                  <option value="UM">UM</option>
                  <option value="FM">FM</option>
                  <option value="MH">MH</option>
                  <option value="PW">PW</option>
                  <option value="AA">AA</option>
                  <option value="AE">AE</option>
                  <option value="AP">AP</option>
                </Select>
                <Input
                  className={styles.stateZip}
                  id={id + "-zip"}
                  value={splitAddress[5]}
                  onChange={(value) => {
                    onChange?.(
                      splitAddress
                        .toSpliced(5, 1, value)
                        .join(ADDRESS_FIELD_SEPARATOR)
                    );
                  }}
                  type="number"
                  min={0}
                  max={99999}
                  size={5}
                  label="ZIP Code"
                />
              </div>
            </>
          ),
          VIRTUAL: (
            <Input
              id={id + "-link"}
              value={splitAddress[1]}
              onChange={(value) => {
                onChange?.(
                  splitAddress
                    .toSpliced(1, 1, value)
                    .join(ADDRESS_FIELD_SEPARATOR)
                );
              }}
              label="Link / Web Address"
            />
          ),
        }[splitAddress[0]]
      }
    </div>
  );
}
